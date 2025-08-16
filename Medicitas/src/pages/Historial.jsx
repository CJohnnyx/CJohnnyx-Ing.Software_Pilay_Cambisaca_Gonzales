import React, { useState } from "react";
import { api } from "../api/mockApi";
import { Input, Button } from "../components/UI";
import { History } from "lucide-react";

export default function Historial() {
  const [cedula, setCedula] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [notes, setNotes] = useState([]);

  const load = async () => {
    const aps = await api.external.getAppointmentsByCedula(cedula);
    const nts = await api.notesByCedula(cedula);
    setAppointments(aps);
    setNotes(nts);
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <History className="w-6 h-6" /> Historial del Paciente
      </h1>

      <div className="p-5 bg-white rounded-2xl border max-w-3xl">
        <div className="flex gap-2 items-end">
          <Input label="Cédula" value={cedula} onChange={(e)=>setCedula(e.target.value)} />
          <Button className="bg-indigo-600 text-white" onClick={load}>Consultar</Button>
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Citas</h4>
            <div className="space-y-2">
              {appointments.map((a)=>(
                <div key={a.id} className="p-3 rounded-2xl border">
                  <div className="font-medium">{a.datetime?.replace("T"," ")}</div>
                  <div className="text-xs text-gray-500">Médico: {a.doctorId} · Motivo: {a.motivo} · Estado: {a.status}</div>
                </div>
              ))}
              {appointments.length===0 && <div className="text-sm text-gray-500">Sin citas</div>}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Consultas</h4>
            <div className="space-y-2">
              {notes.map((n)=>(
                <div key={n.id} className="p-3 rounded-2xl border">
                  <div className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleString()}</div>
                  <div className="font-medium">Diagnóstico:</div>
                  <div className="text-sm">{n.diagnosis}</div>
                  <div className="font-medium mt-2">Prescripción:</div>
                  <div className="text-sm">{n.prescription}</div>
                </div>
              ))}
              {notes.length===0 && <div className="text-sm text-gray-500">Sin registros</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
