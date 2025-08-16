import React, { useEffect, useState } from "react";
import { api } from "../api/mockApi";
import { Input, Select, Button } from "../components/UI";
import { CalendarDays } from "lucide-react";

export default function Citas() {
  const url = new URL(window.location.href);
  const cedulaFromUrl = url.searchParams.get("cedula") || "";

  const [form, setForm] = useState({
    cedula: cedulaFromUrl, email: "", doctorId: "", datetime: "", motivo: "",
  });
  const [doctors, setDoctors] = useState([]);
  const [list, setList] = useState([]);

  useEffect(()=>{ api.doctorsList().then(setDoctors); },[]);
  const reload = async () => setList(await api.appointmentsList({ cedula: form.cedula || undefined }));
  useEffect(()=>{ reload(); },[]);

  const create = async (e) => {
    e.preventDefault();
    try {
      const ap = await api.appointmentsCreate(form);
      await api.notifications.sendAppointmentMail({ appointmentId: ap.id, email: form.email });
      alert("Cita creada y notificación enviada");
      setForm({ ...form, motivo: "", datetime: "" });
      reload();
    } catch (err) { alert(err.message); }
  };

  const cancel = async (id) => { await api.appointmentsUpdate(id, { status: "cancelada" }); reload(); };
  const updateTime = async (id) => {
    const datetime = prompt("Nueva fecha/hora (YYYY-MM-DDTHH:mm)");
    if (!datetime) return; await api.appointmentsUpdate(id, { datetime }); reload();
  };

  const doctorName = (id) => doctors.find(d=>d.id===id)?.name || id;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <CalendarDays className="w-6 h-6" /> Citas
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={create} className="p-5 bg-white rounded-2xl border">
          <h3 className="font-semibold mb-4">Programar cita con notificación</h3>
          <Input label="Cédula del paciente" value={form.cedula} onChange={e=>setForm({...form,cedula:e.target.value})} required />
          <Input label="Email del paciente" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
          <Select label="Médico" value={form.doctorId} onChange={e=>setForm({...form,doctorId:e.target.value})} required>
            <option value="" disabled>Selecciona…</option>
            {doctors.map(d=><option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>)}
          </Select>
          <Input label="Fecha y hora" type="datetime-local" value={form.datetime} onChange={e=>setForm({...form,datetime:e.target.value})} required />
          <Input label="Motivo" value={form.motivo} onChange={e=>setForm({...form,motivo:e.target.value})} placeholder="Control, evaluación, etc." />
          <div className="flex gap-2">
            <Button className="bg-indigo-600 text-white" type="submit">Crear cita</Button>
            <Button className="bg-indigo-600 text-white" type="button" onClick={reload}>Actualizar lista</Button>
          </div>
        </form>

        <div className="p-5 bg-white rounded-2xl border">
          <h3 className="font-semibold mb-4">Citas del paciente</h3>
          <div className="space-y-3">
            {list.map(a=>(
              <div key={a.id} className="p-3 rounded-2xl border flex items-center justify-between">
                <div>
                  <div className="font-medium">{a.datetime?.replace("T"," ") || "—"} · {a.motivo}</div>
                  <div className="text-xs text-gray-500">
                    Médico: {doctorName(a.doctorId)} <span className="ml-2">Estado: {a.status}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="bg-white border" onClick={()=>updateTime(a.id)}>Reprogramar</Button>
                  <Button className="bg-rose-600 text-white" onClick={()=>cancel(a.id)}>Cancelar</Button>
                </div>
              </div>
            ))}
            {list.length===0 && <div className="text-sm text-gray-500">Sin citas aún</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
