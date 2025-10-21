import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [minimized, setMinimized] = useState(false);

  return (
    <aside className={`sidebar ${minimized ? "minimized" : ""}`}>
      <button
        className="sidebar__toggle"
        onClick={() => setMinimized(!minimized)}
        aria-label={minimized ? "Expandir sidebar" : "Minimizar sidebar"}
      >
        {minimized ? "⮞" : "⮜"}
      </button>

      <nav className="sidebar__menu">
        <div className="sidebar__item">
          <i className="icon">🏠</i>
          {!minimized && <span>Inicio</span>}
        </div>
        <div className="sidebar__item">
          <i className="icon">🎵</i>
          {!minimized && <span>Administrar Pistas</span>}
        </div>
        <div className="sidebar__item">
          <i className="icon">📊</i>
          {!minimized && <span>Reportes</span>}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
