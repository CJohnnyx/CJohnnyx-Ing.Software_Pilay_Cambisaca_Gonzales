import React, { useEffect, useState } from "react";
import { api } from "../api/mockApi";
import { Input, Button } from "../components/UI";
import { UserPlus } from "lucide-react";

export default function Pacientes() {
  const [form, setForm] = useState({ nombre: "", apellidos: "", cedula: "", email: "" });
  const [query, setQuery] = useState("");
  const [list, setList] = useState([]);

  const load = async () => setList(await api.patientsList(query));
  useEffect(() => { load(); }, [query]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const rec = await api.patientsCreate(form);
      alert("Paciente registrado: " + rec.nombre);
      setForm({ nombre: "", apellidos: "", cedula: "", email: "" });
      load();
    } catch (err) { alert(err.message); }
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <UserPlus className="w-6 h-6" /> Pacientes
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={submit} className="p-5 bg-white rounded-2xl border-2 border-indigo-400">
          <h3 className="font-semibold mb-4">Registrar nuevo paciente</h3>
          <Input label="Nombre" value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})} required />
          <Input label="Apellidos" value={form.apellidos} onChange={e=>setForm({...form,apellidos:e.target.value})} required />
          <Input label="Cédula" value={form.cedula} onChange={e=>setForm({...form,cedula:e.target.value})} required />
          <Input label="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
          <Button className="bg-indigo-600 text-white">Guardar</Button>
        </form>

        <div className="p-5 bg-white rounded-2xl border-2 border-indigo-400">
          <h3 className="font-semibold mb-4">Buscar pacientes</h3>
          <Input label="Filtro" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Nombre / cédula" />
          <div className="divide-y">
            {list.map((p)=>(
              <div key={p.id} className="py-2 flex justify-between items-center">
                <div>
                  <div className="font-medium">{p.nombre} {p.apellidos}</div>
                  <div className="text-xs text-gray-500">Cédula: {p.cedula} · {p.email}</div>
                </div>
                <a href={`/citas?cedula=${p.cedula}`} className="text-sm text-indigo-600 hover:underline">Agendar cita</a>
              </div>
            ))}
            {list.length===0 && <div className="text-sm text-gray-500">Sin resultados</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
