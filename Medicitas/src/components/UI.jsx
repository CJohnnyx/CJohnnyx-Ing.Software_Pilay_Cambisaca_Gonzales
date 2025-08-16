import React from "react";

export function Input({ label, ...props }) {
  return (
    <label className="block mb-3">
      <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>
      <input
        className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        {...props}
      />
    </label>
  );
}

export function Select({ label, children, ...props }) {
  return (
    <label className="block mb-3">
      <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>
      <select
        className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        {...props}
      >
        {children}
      </select>
    </label>
  );
}

export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`rounded-2xl px-4 py-2 shadow-sm border border-transparent hover:shadow transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
