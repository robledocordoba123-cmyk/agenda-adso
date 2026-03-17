// Archivo: src/components/FormularioContacto.jsx
import { useEffect, useState } from "react";

export default function FormularioContacto({
  onAgregar,
  onActualizar,
  contactoEnEdicion,
  onCancelarEdicion,
}) {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
  });

  const [errores, setErrores] = useState({
    nombre: "",
    telefono: "",
    correo: "",
  });

  const [enviando, setEnviando] = useState(false);

  // NUEVO CLASE 11: cuando llega un contacto en edición, llenamos el formulario con sus datos
  useEffect(() => {
    if (contactoEnEdicion) {
      setForm({
        nombre: contactoEnEdicion.nombre || "",
        telefono: contactoEnEdicion.telefono || "",
        correo: contactoEnEdicion.correo || "",
        etiqueta: contactoEnEdicion.etiqueta || "",
      });
      setErrores({ nombre: "", telefono: "", correo: "" });
    } else {
      // Si no hay contacto en edición, dejamos el formulario vacío (modo crear)
      setForm({ nombre: "", telefono: "", correo: "", etiqueta: "" });
      setErrores({ nombre: "", telefono: "", correo: "" });
    }
  }, [contactoEnEdicion]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function validarFormulario() {
    const nuevosErrores = { nombre: "", telefono: "", correo: "" };

    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }
    if (!form.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    } else if (form.telefono.trim().length < 7) {
      nuevosErrores.telefono = "El teléfono debe tener al menos 7 dígitos.";
    }
    if (!form.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!form.correo.includes("@")) {
      nuevosErrores.correo = "El correo debe contener @.";
    }

    setErrores(nuevosErrores);
    return !nuevosErrores.nombre && !nuevosErrores.telefono && !nuevosErrores.correo;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      setEnviando(true);

      if (contactoEnEdicion) {
        // MODO EDITAR: llamamos a onActualizar con el id del contacto
        await onActualizar({ ...form, id: contactoEnEdicion.id });
      } else {
        // MODO CREAR: igual que antes
        await onAgregar(form);
      }

      setForm({ nombre: "", telefono: "", correo: "", etiqueta: "" });
      setErrores({ nombre: "", telefono: "", correo: "" });
    } finally {
      setEnviando(false);
    }
  };

  const inputClass =
    "w-full bg-blue-50 border-2 border-blue-100 text-gray-800 placeholder-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Nombre *</label>
          <input
            className={inputClass}
            name="nombre"
            placeholder="Ej: Camila Pérez"
            value={form.nombre}
            onChange={onChange}
          />
          {errores.nombre && <p className="mt-1 text-xs text-red-500">{errores.nombre}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Teléfono *</label>
          <input
            className={inputClass}
            name="telefono"
            placeholder="Ej: 300 123 4567"
            value={form.telefono}
            onChange={onChange}
          />
          {errores.telefono && <p className="mt-1 text-xs text-red-500">{errores.telefono}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Correo *</label>
        <input
          className={inputClass}
          name="correo"
          placeholder="Ej: camila@sena.edu.co"
          value={form.correo}
          onChange={onChange}
        />
        {errores.correo && <p className="mt-1 text-xs text-red-500">{errores.correo}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Etiqueta (opcional)</label>
        <input
          className={inputClass}
          name="etiqueta"
          placeholder="Ej: Trabajo"
          value={form.etiqueta}
          onChange={onChange}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        {/* Botón principal: cambia texto según el modo */}
        <button
          type="submit"
          disabled={enviando}
          className="bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500 disabled:from-blue-300 disabled:to-cyan-200 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold shadow-md transition"
        >
          {enviando ? "Guardando..." : contactoEnEdicion ? "Guardar cambios" : "Agregar contacto"}
        </button>

        {/* Botón cancelar: solo aparece en modo edición */}
        {contactoEnEdicion && (
          <button
            type="button"
            onClick={onCancelarEdicion}
            className="bg-gray-100 text-gray-600 border-2 border-gray-200 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition"
          >
            Cancelar edición
          </button>
        )}
      </div>
    </form>
  );
}