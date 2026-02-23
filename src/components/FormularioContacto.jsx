import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {
  const [form, setForm] = useState({ nombre: "", telefono: "", correo: "", etiqueta: "" });

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
    <form onSubmit={onSubmit} className="form-contacto">
      <label>Nombre *</label>
      <input name="nombre" placeholder="Ej: Ana López" value={form.nombre} onChange={onChange} />
      <label>Teléfono *</label>
      <input name="telefono" placeholder="Ej: 300 123 4567" value={form.telefono} onChange={onChange} />
      <label>Correo</label>
      <input name="correo" placeholder="Ej: ana@sena.edu.co" value={form.correo} onChange={onChange} />
      <label>Etiqueta (opcional)</label>
      <input name="etiqueta" placeholder="Ej: Compañera, Instructor..." value={form.etiqueta} onChange={onChange} />
      <button type="submit">Agregar contacto</button>
    </form>
  );
}