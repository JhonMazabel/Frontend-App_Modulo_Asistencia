import React, { useState } from "react";
import "./style.css"; // Puedes mantener tus estilos actuales

export default function Students() {
const [records, setRecords] = useState([
{ nombre: "Juan Pérez", curso: "Multimedia II", fecha: "2025-10-24", estado: "Presente" },
{ nombre: "María López", curso: "Administración", fecha: "2025-10-24", estado: "Ausente" },
]);

const [modalOpen, setModalOpen] = useState(false);
const [editIndex, setEditIndex] = useState(null);
const [formData, setFormData] = useState({ nombre: "", curso: "", fecha: "", estado: "Presente" });

const openAdd = () => {
setEditIndex(null);
setFormData({ nombre: "", curso: "", fecha: "", estado: "Presente" });
setModalOpen(true);
};

const openEdit = (index) => {
setEditIndex(index);
setFormData(records[index]);
setModalOpen(true);
};

const deleteRow = (index) => {
if (window.confirm("¿Seguro que deseas eliminar este registro?")) {
setRecords(records.filter((_, i) => i !== index));
}
};

const closeModal = () => setModalOpen(false);

const save = () => {
if (!formData.nombre || !formData.curso || !formData.fecha) {
alert("Por favor, completa todos los campos.");
return;
}

```
const newRecords = [...records];
if (editIndex !== null) {
  newRecords[editIndex] = formData;
} else {
  newRecords.push(formData);
}
setRecords(newRecords);
closeModal();
```

};

return ( <div className="wrap"> <header> <h1>Portal — Modal Interactivo</h1> <div> <button className="btn" onClick={openAdd}>
+ Agregar registro </button> </div> </header>

```
  <div className="table">
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Curso</th>
          <th>Fecha</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {records.map((r, i) => (
          <tr key={i}>
            <td>{r.nombre}</td>
            <td>{r.curso}</td>
            <td>{r.fecha}</td>
            <td>{r.estado}</td>
            <td className="actions">
              <button onClick={() => openEdit(i)}>Editar</button>
              <button onClick={() => deleteRow(i)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {modalOpen && (
    <div className="overlay" role="dialog" aria-modal="true">
      <div className="modal" role="document">
        <h2>{editIndex !== null ? "Editar registro" : "Agregar registro"}</h2>

        <div className="field">
          <label>Nombre</label>
          <input
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          />
        </div>

        <div className="field">
          <label>Curso</label>
          <input
            value={formData.curso}
            onChange={(e) => setFormData({ ...formData, curso: e.target.value })}
          />
        </div>

        <div className="field">
          <label>Fecha</label>
          <input
            type="date"
            value={formData.fecha}
            onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
          />
        </div>

        <div className="field">
          <label>Estado</label>
          <select
            value={formData.estado}
            onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
          >
            <option value="Presente">Presente</option>
            <option value="Ausente">Ausente</option>
          </select>
        </div>

        <div className="modal-footer">
          <button className="btn-ghost" onClick={closeModal}>
            Cancelar
          </button>
          <button className="btn" onClick={save}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  )}
</div>

);
}
