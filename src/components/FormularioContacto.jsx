import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {
  // Estado principal del formulario
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
  });

  // Estado para los mensajes de error de cada campo
  const [errores, setErrores] = useState({
    nombre: "",
    telefono: "",
    correo: "",
  });

  // Estado para saber si el formulario está enviando datos a la API
  const [enviando, setEnviando] = useState(false);

  // Actualiza el campo que el usuario está escribiendo
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Revisa que los campos estén bien antes de enviar
  function validarFormulario() {
    const nuevosErrores = { nombre: "", telefono: "", correo: "" };

    // .trim() evita que espacios en blanco cuenten como texto válido
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

    // Retorna true solo si no hay ningún error
    return !nuevosErrores.nombre && !nuevosErrores.telefono && !nuevosErrores.correo;
  }

  // Maneja el envío del formulario
  const onSubmit = async (e) => {
    e.preventDefault();

    // Si hay errores de validación, no seguimos
    const esValido = validarFormulario();
    if (!esValido) return;

    try {
      setEnviando(true); // Desactivamos el botón mientras guarda
      await onAgregar(form);

      // Limpiamos el formulario si todo salió bien
      setForm({ nombre: "", telefono: "", correo: "", etiqueta: "" });
      setErrores({ nombre: "", telefono: "", correo: "" });
    } finally {
      setEnviando(false); // Volvemos a activar el botón pase lo que pase
    }
  };

  const inputClass =
    "w-full bg-blue-50 border-2 border-blue-100 text-gray-800 placeholder-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Campo Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Nombre *
          </label>
          <input
            className={inputClass}
            name="nombre"
            placeholder="Ej: Camila Pérez"
            value={form.nombre}
            onChange={onChange}
          />
          {/* Muestra el error solo si existe */}
          {errores.nombre && (
            <p className="mt-1 text-xs text-red-500">{errores.nombre}</p>
          )}
        </div>

        {/* Campo Teléfono */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Teléfono *
          </label>
          <input
            className={inputClass}
            name="telefono"
            placeholder="Ej: 300 123 4567"
            value={form.telefono}
            onChange={onChange}
          />
          {errores.telefono && (
            <p className="mt-1 text-xs text-red-500">{errores.telefono}</p>
          )}
        </div>
      </div>

      {/* Campo Correo */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Correo *
        </label>
        <input
          className={inputClass}
          name="correo"
          placeholder="Ej: camila@sena.edu.co"
          value={form.correo}
          onChange={onChange}
        />
        {errores.correo && (
          <p className="mt-1 text-xs text-red-500">{errores.correo}</p>
        )}
      </div>

      {/* Campo Etiqueta (no es obligatorio) */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Etiqueta (opcional)
        </label>
        <input
          className={inputClass}
          name="etiqueta"
          placeholder="Ej: Trabajo"
          value={form.etiqueta}
          onChange={onChange}
        />
      </div>

      {/* Botón: cambia texto y se desactiva mientras guarda */}
      <button
        type="submit"
        disabled={enviando}
        className="bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500 disabled:from-blue-300 disabled:to-cyan-200 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold shadow-md transition"
      >
        {enviando ? "Guardando..." : "Agregar contacto"}
      </button>
    </form>
  );
}