import React from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import HomeContent from "./components/HomeContent/HomeContent";
import "./index.css";

export default function App() {
  // username will later come from auth/context
  const username = "Profesor Pérez";

  return (
    <div className="app-layout">
      <Header username={username} />
      <div className="layout__body">
        <aside className="layout__sidebar">
          <Sidebar />
        </aside>
        <main className="layout__main">
          <HomeContent />
        </main>
      </div>
    </div>
  );
}
