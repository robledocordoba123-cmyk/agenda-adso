import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {
  const [form, setForm] = useState({
    nombre: "", telefono: "", correo: "", etiqueta: "",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.telefono || !form.correo) return;
    onAgregar(form);
    setForm({ nombre: "", telefono: "", correo: "", etiqueta: "" });
  };

  const inputClass = "w-full bg-blue-50 border-2 border-blue-100 text-gray-800 placeholder-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Nombre *</label>
          <input className={inputClass} name="nombre" placeholder="Ej: Camila Pérez" value={form.nombre} onChange={onChange} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Teléfono *</label>
          <input className={inputClass} name="telefono" placeholder="Ej: 300 123 4567" value={form.telefono} onChange={onChange} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Correo *</label>
        <input className={inputClass} name="correo" placeholder="Ej: camila@sena.edu.co" value={form.correo} onChange={onChange} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Etiqueta (opcional)</label>
        <input className={inputClass} name="etiqueta" placeholder="Ej: Trabajo" value={form.etiqueta} onChange={onChange} />
      </div>
      <button type="submit" className="bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition">
        Agregar contacto
      </button>
    </form>
  );
}