import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.telefono.trim()) {
      alert("Completa al menos Nombre y Teléfono");
      return;
    }
    onAgregar(form);
    setForm({ nombre: "", telefono: "", correo: "", etiqueta: "" });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white shadow-md rounded-lg p-5 flex flex-col gap-4 mb-6"
    >
      <label className="text-sm font-semibold">Nombre *</label>
      <input
        name="nombre"
        value={form.nombre}
        onChange={onChange}
        placeholder="Ej: Ana López"
        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
      />

      <label className="text-sm font-semibold">Teléfono *</label>
      <input
        name="telefono"
        value={form.telefono}
        onChange={onChange}
        placeholder="Ej: 300 123 4567"
        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
      />

      <label className="text-sm font-semibold">Correo</label>
      <input
        name="correo"
        value={form.correo}
        onChange={onChange}
        placeholder="Ej: ana@sena.edu.co"
        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
      />

      <label className="text-sm font-semibold">Etiqueta (opcional)</label>
      <input
        name="etiqueta"
        value={form.etiqueta}
        onChange={onChange}
        placeholder="Ej: Compañera, Instructor..."
        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
      />

      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-800 text-white py-2 rounded-md font-semibold transition"
      >
        Agregar contacto
      </button>
    </form>
  );
}