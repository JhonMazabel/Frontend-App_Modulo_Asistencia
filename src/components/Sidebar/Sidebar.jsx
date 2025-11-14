import React, { useState } from "react";
import "./Sidebar.css";
import Students from "../Estudiantes/Students";
import HomeContent from "../HomeContent/HomeContent";

const Sidebar = () => {
  const [minimized, setMinimized] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  const renderContent = () => {
    switch(activeSection) {
      case "Estudiantes":
        return <Students />;
      case "inicio":
        return <HomeContent />;
      case "profesores":
        return <div className="content">Profesores</div>;
      case "rol":
        return <div className="content">Roles</div>;
      default:
        return <HomeContent />;
    }
  };

  return (
    <div className="sidebar-container">
      <aside className={`sidebar ${minimized ? "minimized" : ""}`}>
        <button
          className="sidebar__toggle"
          onClick={() => setMinimized(!minimized)}
          aria-label={minimized ? "Expandir sidebar" : "Minimizar sidebar"}
        >
          {minimized ? "⮞" : "⮜"}
        </button>

        <nav className="sidebar__menu">
          <div className="sidebar__item" onClick={() => setActiveSection("inicio")}>
            <i className="icon">🏠</i>
            {!minimized && <span>Inicio</span>}
          </div>
          <div className="sidebar__item" onClick={() => setActiveSection("profesores")}>
            <i className="icon">🎵</i>
            {!minimized && <span>Profesores</span>}
          </div>
          <div className="sidebar__item" onClick={() => setActiveSection("rol")}>
            <i className="icon">📊</i>
            {!minimized && <span>Rol</span>}
          </div>
          <div className={`sidebar__item ${activeSection === "estudiantes" ? "active" : ""}`}
          onClick={() => setActiveSection("Estudiantes")}>
            <i className="icon">👥</i>
            {!minimized && <span>Estudiantes</span>}
          </div>
        </nav>
      </aside>

      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default Sidebar;
