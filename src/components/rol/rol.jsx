import React, { useEffect, useState } from 'react';
import './rol.css';

export default function Rol() {
  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState({ id: '', nombre: '', descripcion: '', permisos: '', activo: true });
  const [alert, setAlert] = useState({ message: '', type: '' });

  useEffect(() => {
    try {
      const raw = localStorage.getItem('roles');
      if (raw) setRoles(JSON.parse(raw));
    } catch (e) {
      console.error('Error leyendo roles desde localStorage', e);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setAlert({ message: '', type: '' }), 3500);
    return () => clearTimeout(t);
  }, [alert.message]);

  const persist = (next) => {
    setRoles(next);
    try { localStorage.setItem('roles', JSON.stringify(next)); } catch (e) { console.error(e); }
  };

  const showAlert = (message, type = 'success') => setAlert({ message, type });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [id]: type === 'checkbox' ? checked : value }));
  };

  const resetForm = () => setForm({ id: '', nombre: '', descripcion: '', permisos: '', activo: true });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) {
      showAlert('El nombre del rol es obligatorio', 'error');
      return;
    }

    if (form.id) {
      // editar
      const updated = roles.map(r => (r.id === form.id ? { ...r, ...form } : r));
      persist(updated);
      showAlert('Rol actualizado correctamente', 'success');
    } else {
      // crear
      const nuevo = { ...form, id: Date.now().toString() };
      const next = [nuevo, ...roles];
      persist(next);
      showAlert('Rol creado correctamente', 'success');
    }
    resetForm();
  };

  const handleEdit = (id) => {
    const r = roles.find(x => x.id === id);
    if (!r) return;
    setForm({ ...r });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    const r = roles.find(x => x.id === id);
    if (!r) return;
    if (!window.confirm(`Eliminar rol "${r.nombre}"?`)) return;
    const next = roles.filter(x => x.id !== id);
    persist(next);
    showAlert('Rol eliminado', 'success');
  };

  const handleCancel = () => resetForm();

  return (
    <div className="container">
      <h1>📚 Sistema de Gestión de Roles</h1>

      {alert.message && (
        <div className={`alert ${alert.type === 'success' ? 'alert-success' : 'alert-error'}`}>
          {alert.message}
        </div>
      )}

      <div className="card">
        <h2 id="formTitle">{form.id ? '✏️ Editar Rol' : '➕ Crear Nuevo Rol'}</h2>
        <form id="rolForm" onSubmit={handleSubmit}>
          <input type="hidden" id="id" value={form.id || ''} />

          <div className="form-group">
            <label htmlFor="nombre">Nombre del Rol *</label>
            <input id="nombre" value={form.nombre} onChange={handleChange} required placeholder="Ej: Estudiante Regular" />
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción</label>
            <textarea id="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción del rol..." />
          </div>

          <div className="form-group">
            <label htmlFor="permisos">Permisos</label>
            <input id="permisos" value={form.permisos} onChange={handleChange} placeholder="Ej: lectura, escritura, edición" />
          </div>

          <div className="form-group">
            <div className="checkbox-group">
              <input type="checkbox" id="activo" checked={Boolean(form.activo)} onChange={handleChange} />
              <label htmlFor="activo" style={{ marginBottom: 0 }}>Rol activo</label>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" id="submitBtn">{form.id ? 'Guardar Cambios' : 'Crear Rol'}</button>
            {form.id && (
              <button type="button" className="btn btn-success" id="cancelBtn" onClick={handleCancel}>Cancelar</button>
            )}
          </div>
        </form>
      </div>

      <div className="card">
        <h2>📋 Roles Registrados</h2>
        <div id="rolesTableContainer">
          {roles.length === 0 ? (
            <div className="empty-state">No hay roles registrados.</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Permisos</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {roles.map(r => (
                  <tr key={r.id}>
                    <td>{r.nombre}</td>
                    <td>{r.descripcion}</td>
                    <td>{r.permisos}</td>
                    <td>
                      <span className={`badge ${r.activo ? 'badge-active' : 'badge-inactive'}`}>
                        {r.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td>
                      <button className="btn-edit" onClick={() => handleEdit(r.id)}>Editar</button>
                      <button className="btn-danger" onClick={() => handleDelete(r.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}