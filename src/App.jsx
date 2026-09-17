import React from "react";
import estilos from "./App.module.css";
import { Outlet } from "react-router-dom";
import Header from "./componentes/Header";
import Footer from "./componentes/Footer";

function App() {
  return (
    <div className={estilos.App}>
      <Header />
      <Outlet />
      <Footer/>
    </div>
  );
}

export default App;