import React, { useState } from "react";
import { Input, Button } from "../components/UI";
import { FileText } from "lucide-react";

export default function Certificados() {
  const [form, setForm] = useState({ cedula: "", doctor: "", detalle: "", diasReposo: 1 });

  const download = () => {
    const content = `CERTIFICADO MÉDICO

Cédula: ${form.cedula}
Médico: ${form.doctor}
Detalle: ${form.detalle}
Días de reposo: ${form.diasReposo}

Emitido: ${new Date().toLocaleString()}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `certificado_${form.cedula}.txt`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <FileText className="w-6 h-6" /> Certificados
      </h1>

      <div className="p-5 bg-white rounded-2xl border">
        <h3 className="font-semibold mb-4">Generar certificado médico</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Cédula" value={form.cedula} onChange={e=>setForm({...form,cedula:e.target.value})} />
          <Input label="Médico" value={form.doctor} onChange={e=>setForm({...form,doctor:e.target.value})} />
          <Input label="Días de reposo" type="number" value={form.diasReposo} onChange={e=>setForm({...form,diasReposo:e.target.value})} />
        </div>
        <label className="block mt-3">
          <span className="block text-sm font-medium text-gray-700 mb-1">Detalle</span>
          <textarea className="w-full rounded-2xl border border-gray-300 p-3" rows={4} value={form.detalle} onChange={e=>setForm({...form,detalle:e.target.value})}></textarea>
        </label>
        <div className="mt-4">
          <Button className="bg-indigo-600 text-white" onClick={download}>Descargar certificado</Button>
        </div>
      </div>
    </div>
  );
}
