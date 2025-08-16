import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Pacientes from "./pages/Pacientes";
import Citas from "./pages/Citas";
import Certificados from "./pages/Certificados";
import Consultas from "./pages/Consultas";
import Historial from "./pages/Historial";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex flex-col">
        <Navbar />
        <main className="max-w-6xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pacientes" element={<Pacientes />} />
            <Route path="/citas" element={<Citas />} />
            <Route path="/certificados" element={<Certificados />} />
            <Route path="/consultas" element={<Consultas />} />
            <Route path="/historial" element={<Historial />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
