(function() {
      const form = document.getElementById('loginForm');
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      const errorMsg = document.getElementById('errorMsg');

      
      const demoUser = {
        email: 'usuario@ejemplo.com',
        password: '123456'
      };

      function showError(text) {
        errorMsg.textContent = text;
        errorMsg.style.display = 'block';
      }
      function clearError() {
        errorMsg.textContent = '';
        errorMsg.style.display = 'none';
      }

      form.addEventListener('submit', function(ev) {
        ev.preventDefault();
        clearError();

        // Validaciones nativas + extras
        if (!email.value) {
          showError('Ingresa tu correo electrónico.');
          email.focus();
          return;
        }
        if (!password.value) {
          showError('Ingresa tu contraseña.');
          password.focus();
          return;
        }
        if (password.value.length < 6) {
          showError('La contraseña debe tener al menos 6 caracteres.');
          password.focus();
          return;
        }

        // Simulación de verificación (solo demo)
        if (email.value.toLowerCase() === demoUser.email && password.value === demoUser.password) {
          // Inicio de sesión "exitoso" — para demo mostramos alerta y reseteamos
          alert('Inicio de sesión correcto. ¡Bienvenido!');
          form.reset();
          clearError();
        } else {
          showError('Correo o contraseña incorrectos.');
        }

        // En un entorno real:
        // fetch('/api/login', { method: 'POST', body: JSON.stringify({email: email.value, password: password.value}), headers:{'Content-Type':'application/json'} })
        //   .then(r => r.json()).then(data => { ... })
        //   .catch(err => showError('Error de red.'));
      });

      // Mejora UX: quitar mensaje de error al escribir
      [email, password].forEach(el => {
        el.addEventListener('input', clearError);
      });

      // Comportamiento del link "olvidé"
      document.getElementById('forgotLink').addEventListener('click', function(ev) {
        ev.preventDefault();
        alert('Funcionalidad de recuperación de contraseña (demo).');
      });
    })();