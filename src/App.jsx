import React from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import "./index.css";

export default function App() {
  // username will later come from auth/context
  const username = "Profesor Pérez";

  return (
    <div className="app-layout">
      <Header username={username} />
      <Sidebar />
    </div>
  );
}