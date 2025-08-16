import React, { useEffect, useState } from "react";
import { api } from "../api/mockApi";
import { Input, Select, Button } from "../components/UI";
import { ClipboardList } from "lucide-react";

export default function Consultas() {
  const [cedula, setCedula] = useState("");
  const [apps, setApps] = useState([]);
  const [form, setForm] = useState({ appointmentId: "", doctorId: "", diagnosis: "", prescription: "" });
  const [doctors, setDoctors] = useState([]);

  useEffect(()=>{ api.doctorsList().then(setDoctors); },[]);

  const search = async () => { setApps(await api.appointmentsList({ cedula })); };
  const save = async (e) => {
    e.preventDefault();
    await api.notesCreate(form);
    alert("Consulta registrada (RF05)");
    setForm({ appointmentId: "", doctorId: "", diagnosis: "", prescription: "" });
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <ClipboardList className="w-6 h-6" /> Consultas
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-5 bg-white rounded-2xl border">
          <h3 className="font-semibold mb-4">Buscar citas por cédula</h3>
          <div className="flex gap-2 items-end">
            <Input label="Cédula" value={cedula} onChange={(e)=>setCedula(e.target.value)} />
            <Button className="bg-indigo-600 text-white" onClick={search}>Buscar</Button>
          </div>
          <div className="mt-4 space-y-2">
            {apps.map((a)=>(
              <label key={a.id} className="p-3 border rounded-2xl flex items-center gap-2">
                <input type="radio" name="ap" value={a.id} onChange={()=>setForm({...form,appointmentId:a.id})}/>
                <div>
                  <div className="font-medium">{a.datetime?.replace("T"," ")}</div>
                  <div className="text-xs text-gray-500">Motivo: {a.motivo} · Médico: {a.doctorId}</div>
                </div>
              </label>
            ))}
            {apps.length===0 && <div className="text-sm text-gray-500">Sin resultados</div>}
          </div>
        </div>

        <form onSubmit={save} className="p-5 bg-white rounded-2xl border">
          <h3 className="font-semibold mb-4">Registrar diagnóstico y prescripción</h3>
          <Select label="Médico" value={form.doctorId} onChange={e=>setForm({...form,doctorId:e.target.value})} required>
            <option value="" disabled>Selecciona…</option>
            {doctors.map(d=><option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>)}
          </Select>
          <label className="block mb-3">
            <span className="block text-sm font-medium text-gray-700 mb-1">Diagnóstico</span>
            <textarea className="w-full rounded-2xl border border-gray-300 p-3" rows={3} value={form.diagnosis} onChange={e=>setForm({...form,diagnosis:e.target.value})} required></textarea>
          </label>
          <label className="block mb-3">
            <span className="block text-sm font-medium text-gray-700 mb-1">Prescripción</span>
            <textarea className="w-full rounded-2xl border border-gray-300 p-3" rows={3} value={form.prescription} onChange={e=>setForm({...form,prescription:e.target.value})} required></textarea>
          </label>
          <Button className="bg-indigo-600 text-white" type="submit">Guardar consulta</Button>
        </form>
      </div>
    </div>
  );
}
