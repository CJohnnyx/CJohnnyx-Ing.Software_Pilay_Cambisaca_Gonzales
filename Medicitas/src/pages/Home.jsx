import React from "react";
import Card from "../components/Card";
import { Stethoscope } from "lucide-react";

export default function Home() {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Stethoscope className="w-6 h-6" />
        <h1 className="text-2xl md:text-3xl font-bold">Panel</h1>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <Card title="Pacientes" to="/pacientes" description="Registrar y gestionar pacientes" />
        <Card title="Citas" to="/citas" description="Agendar / modificar / cancelar" />
        <Card title="Certificados" to="/certificados" description="Emitir certificados médicos" />
        <Card title="Consultas" to="/consultas" description="Diagnósticos y prescripciones" />
        <Card title="Historial" to="/historial" description="Portal del paciente" />
      </div>
    </div>
  );
}
