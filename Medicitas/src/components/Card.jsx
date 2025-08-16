import React from "react";
import { Link } from "react-router-dom";

export default function Card({ title, description, to }) {
  return (
    <Link to={to} className="block p-5 rounded-lg bg-white border-2 border-indigo-200 hover:shadow-md transition duration-300 hover:scale-105">
      <h3 className="font-semibold text-lg mb-2 text-indigo-600">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </Link>
  );
}
