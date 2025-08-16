import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full border-2 border-transparent bg-clip-padding bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400 p-[2px] rounded-b-xl shadow">
      <div className="bg-white/80 rounded-b-xl px-6 py-3 flex items-center justify-between">
        <span className="font-bold text-xl">MediCitas</span>
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-500 font-bold underline"
                : "hover:text-indigo-300 transition"
            }
          >
            Inicio
          </NavLink>
          <NavLink
            to="/pacientes"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-500 font-bold underline"
                : "hover:text-indigo-300 transition"
            }
          >
            Pacientes
          </NavLink>
          <NavLink
            to="/citas"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-500 font-bold underline"
                : "hover:text-indigo-300 transition"
            }
          >
            Citas
          </NavLink>
          <NavLink
            to="/certificados"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-500 font-bold underline"
                : "hover:text-indigo-300 transition"
            }
          >
            Certificados
          </NavLink>
          <NavLink
            to="/consultas"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-500 font-bold underline"
                : "hover:text-indigo-300 transition"
            }
          >
            Consultas
          </NavLink>
          <NavLink
            to="/historial"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-500 font-bold underline"
                : "hover:text-indigo-300 transition"
            }
          >
            Historial
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
