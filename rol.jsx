 <script>
        // Simulación de base de datos en memoria
        let roles = [
            {
                id: 1,
                nombre: "Estudiante Regular",
                descripcion: "Estudiante con acceso básico",
                permisos: "lectura, consulta",
                activo: 1,
                fecha_creacion: new Date().toISOString()
            },
            {
                id: 2,
                nombre: "Monitor",
                descripcion: "Estudiante con permisos de monitor de clase",
                permisos: "lectura, consulta, moderación",
                activo: 1,
                fecha_creacion: new Date().toISOString()
            },
            {
                id: 3,
                nombre: "Representante",
                descripcion: "Representante estudiantil",
                permisos: "lectura, consulta, gestión",
                activo: 1,
                fecha_creacion: new Date().toISOString()
            }
        ];
        let nextId = 4;
        let editingId = null;

        // Elementos del DOM
        const rolForm = document.getElementById('rolForm');
        const formTitle = document.getElementById('formTitle');
        const submitBtn = document.getElementById('submitBtn');
        const cancelBtn = document.getElementById('cancelBtn');
        const alertContainer = document.getElementById('alertContainer');

        // Mostrar alerta
        function showAlert(message, type = 'success') {
            alertContainer.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
            setTimeout(() => {
                alertContainer.innerHTML = '';
            }, 3000);
        }

        // Renderizar tabla de roles
        function renderRoles() {
            const container = document.getElementById('rolesTableContainer');
            
            if (roles.length === 0) {
                container.innerHTML = '<div class="empty-state">No hay roles registrados</div>';
                return;
            }

            const table = `
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Permisos</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${roles.map(rol => `
                            <tr>
                                <td>${rol.id}</td>
                                <td><strong>${rol.nombre}</strong></td>
                                <td>${rol.descripcion || '-'}</td>
                                <td>${rol.permisos || '-'}</td>
                                <td>
                                    <span class="badge ${rol.activo ? 'badge-active' : 'badge-inactive'}">
                                        ${rol.activo ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td>
                                    <button class="btn btn-edit" onclick="editRol(${rol.id})">Editar</button>
                                    <button class="btn btn-danger" onclick="deleteRol(${rol.id})">Eliminar</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            container.innerHTML = table;
        }

        // Crear o actualizar rol
        rolForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const rolData = {
                nombre: document.getElementById('nombre').value,
                descripcion: document.getElementById('descripcion').value,
                permisos: document.getElementById('permisos').value,
                activo: document.getElementById('activo').checked ? 1 : 0
            };

            if (editingId) {
                // Actualizar
                const index = roles.findIndex(r => r.id === editingId);
                roles[index] = { ...roles[index], ...rolData };
                showAlert('✅ Rol actualizado exitosamente');
                resetForm();
            } else {
                // Crear
                const newRol = {
                    id: nextId++,
                    ...rolData,
                    fecha_creacion: new Date().toISOString()
                };
                roles.unshift(newRol);
                showAlert('✅ Rol creado exitosamente');
                rolForm.reset();
                document.getElementById('activo').checked = true;
            }

            renderRoles();
        });

        // Editar rol
        window.editRol = function(id) {
            const rol = roles.find(r => r.id === id);
            if (!rol) return;

            editingId = id;
            document.getElementById('rolId').value = rol.id;
            document.getElementById('nombre').value = rol.nombre;
            document.getElementById('descripcion').value = rol.descripcion || '';
            document.getElementById('permisos').value = rol.permisos || '';
            document.getElementById('activo').checked = rol.activo;

            formTitle.textContent = '✏️ Editar Rol';
            submitBtn.textContent = 'Actualizar Rol';
            cancelBtn.style.display = 'inline-block';

            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        // Eliminar rol
        window.deleteRol = function(id) {
            if (confirm('¿Estás seguro de eliminar este rol?')) {
                roles = roles.filter(r => r.id !== id);
                showAlert('🗑️ Rol eliminado exitosamente');
                renderRoles();
            }
        };

        // Resetear formulario
        function resetForm() {
            editingId = null;
            rolForm.reset();
            document.getElementById('activo').checked = true;
            formTitle.textContent = '➕ Crear Nuevo Rol';
            submitBtn.textContent = 'Crear Rol';
            cancelBtn.style.display = 'none';
        }

        // Cancelar edición
        cancelBtn.addEventListener('click', resetForm);

        // Cargar roles al iniciar
        renderRoles();
    </script>