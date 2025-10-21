import React from "react";
import "./Header.css";

const UserMenu = () => {
  return (
    <div className="user-menu" role="menu">
      <ul>
        <li role="menuitem">👤 Perfil</li>
        <li role="menuitem">🔒 Cambio de contraseña</li>
        <li role="menuitem">🚪 Cerrar sesión</li>
      </ul>
    </div>
  );
};

export default UserMenu;
