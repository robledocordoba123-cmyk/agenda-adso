// Archivo: src/App.jsx
import { useEffect, useState } from "react";
import { listarContactos, crearContacto, eliminarContactoPorId, actualizarContacto } from "./api.js";
import { APP_INFO } from "./config";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [ordenAsc, setOrdenAsc] = useState(true);

  // NUEVO CLASE 11: guarda el contacto que se está editando (o null si no hay ninguno)
  const [contactoEnEdicion, setContactoEnEdicion] = useState(null);

  useEffect(() => {
    async function cargarContactos() {
      try {
        setCargando(true);
        setError("");
        const data = await listarContactos();
        setContactos(data);
      } catch (error) {
        console.error("Error al cargar contactos:", error);
        setError("No se pudieron cargar los contactos. Verifica que JSON Server esté encendido e intenta de nuevo.");
      } finally {
        setCargando(false);
      }
    }
    cargarContactos();
  }, []);

  const agregarContacto = async (nuevo) => {
    try {
      setError("");
      const creado = await crearContacto(nuevo);
      setContactos((prev) => [...prev, creado]);
    } catch (error) {
      console.error("Error al crear contacto:", error);
      setError("No se pudo guardar el contacto. Verifica tu conexión o que el servidor esté encendido.");
      throw error;
    }
  };

  // NUEVO CLASE 11: actualiza el contacto en la API y refresca la lista
  const actualizarContactoHandler = async (contactoActualizado) => {
    try {
      setError("");
      const actualizado = await actualizarContacto(contactoActualizado.id, contactoActualizado);
      setContactos((prev) => prev.map((c) => (c.id === actualizado.id ? actualizado : c)));
      setContactoEnEdicion(null);
    } catch (error) {
      console.error("Error al actualizar contacto:", error);
      setError("No se pudo actualizar el contacto. Verifica tu conexión o el servidor.");
      throw error;
    }
  };

  const eliminarContacto = async (id) => {
    try {
      setError("");
      await eliminarContactoPorId(id);
      setContactos((prev) => prev.filter((c) => c.id !== id));
      // NUEVO CLASE 11: si el que se elimina estaba en edición, cancelamos la edición
      setContactoEnEdicion((actual) => (actual && actual.id === id ? null : actual));
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
      setError("No se pudo eliminar el contacto. Vuelve a intentarlo o verifica el servidor.");
    }
  };

  // NUEVO CLASE 11: activa el modo edición con el contacto seleccionado
  const onEditarClick = (contacto) => {
    setContactoEnEdicion(contacto);
    setError("");
  };

  // NUEVO CLASE 11: cancela la edición y vuelve al modo crear
  const onCancelarEdicion = () => {
    setContactoEnEdicion(null);
  };

  const contactosFiltrados = contactos.filter((c) => {
    const termino = busqueda.toLowerCase();
    return (
      c.nombre.toLowerCase().includes(termino) ||
      c.correo.toLowerCase().includes(termino) ||
      (c.etiqueta || "").toLowerCase().includes(termino) ||
      c.telefono.toLowerCase().includes(termino)
    );
  });

  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    const nombreA = a.nombre.toLowerCase();
    const nombreB = b.nombre.toLowerCase();
    if (nombreA < nombreB) return ordenAsc ? -1 : 1;
    if (nombreA > nombreB) return ordenAsc ? 1 : -1;
    return 0;
  });

  return (
    <main className="min-h-screen bg-white">
      <header className="bg-gradient-to-r from-blue-600 to-cyan-400 px-6 py-10">
        <p className="text-xs font-bold text-blue-100 tracking-widest uppercase mb-1">
          Programa ADSO — Ficha {APP_INFO.ficha}
        </p>
        <h1 className="text-5xl font-black text-white">
          {APP_INFO.titulo} <span className="text-cyan-200">v9</span>
        </h1>
        <p className="text-blue-100 mt-2 text-sm">{APP_INFO.subtitulo}</p>
      </header>

      <section className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-300 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {cargando && (
          <div className="rounded-xl bg-blue-50 border border-blue-300 px-4 py-3 text-sm text-blue-600">
            Cargando contactos desde la API...
          </div>
        )}

        {/* Formulario: ahora soporta crear y editar */}
        <div className="bg-white rounded-2xl p-6 border-2 border-blue-100 shadow-lg shadow-blue-50">
          <h2 className="text-lg font-bold text-blue-600 mb-4">
            {contactoEnEdicion ? "✏️ Editar contacto" : "➕ Nuevo contacto"}
          </h2>
          <FormularioContacto
            onAgregar={agregarContacto}
            onActualizar={actualizarContactoHandler}
            contactoEnEdicion={contactoEnEdicion}
            onCancelarEdicion={onCancelarEdicion}
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <input
            type="text"
            className="w-full md:flex-1 rounded-xl border-2 border-blue-100 bg-blue-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
            placeholder="Buscar por nombre, correo, etiqueta o teléfono..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setOrdenAsc((prev) => !prev)}
            className="bg-blue-50 border-2 border-blue-100 text-blue-600 text-sm px-5 py-3 rounded-xl hover:bg-blue-100 transition font-medium"
          >
            {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
          </button>
        </div>

        <p className="text-xs text-gray-400 -mt-4">
          Mostrando {contactosOrdenados.length} {contactosOrdenados.length === 1 ? "contacto" : "contactos"}
        </p>

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800">
            📋 Contactos <span className="text-cyan-500">({contactosOrdenados.length})</span>
          </h2>
          {contactosOrdenados.length === 0 && !cargando && (
            <p className="text-gray-400 text-sm">
              No se encontraron contactos que coincidan con la búsqueda.
            </p>
          )}
          {contactosOrdenados.map((c) => (
            <ContactoCard
              key={c.id}
              {...c}
              onEliminar={() => eliminarContacto(c.id)}
              onEditar={() => onEditarClick(c)}
            />
          ))}
        </div>

        <footer className="pt-4 text-xs text-gray-400 border-t border-gray-100">
          <p>Desarrollo Web – ReactJS | Proyecto Agenda ADSO</p>
          <p>Instructor: Gustavo Adolfo Bolaños Dorado</p>
        </footer>
      </section>
    </main>
  );
}