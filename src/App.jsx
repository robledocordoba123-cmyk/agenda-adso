// Archivo: src/App.jsx
// Componente principal de la aplicación Agenda ADSO.
// Se encarga de:
// - Cargar la lista de contactos desde la API (JSON Server)
// - Manejar estados globales (contactos, carga, error)
// - Aplicar búsqueda y ordenamiento sobre la lista
import { useEffect, useState } from "react";
import { listarContactos, crearContacto, eliminarContactoPorId } from "./api.js";
import { APP_INFO } from "./config";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // === NUEVOS ESTADOS CLASE 10 ===
  // Guarda lo que el usuario escribe en el buscador
  const [busqueda, setBusqueda] = useState("");
  // true = orden A-Z, false = orden Z-A
  const [ordenAsc, setOrdenAsc] = useState(true);

  // Carga los contactos al abrir la app (GET)
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

  // Agrega un contacto nuevo (POST)
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

  // Elimina un contacto por id (DELETE)
  const eliminarContacto = async (id) => {
    try {
      setError("");
      await eliminarContactoPorId(id);
      setContactos((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
      setError("No se pudo eliminar el contacto. Vuelve a intentarlo o verifica el servidor.");
    }
  };

  // === LÓGICA DE BÚSQUEDA Y ORDENAMIENTO (CLASE 10) ===

  // 1. Filtramos los contactos según lo que escribió el usuario
  // filter no modifica el array original, crea uno nuevo
  const contactosFiltrados = contactos.filter((c) => {
    const termino = busqueda.toLowerCase();
    const nombre = c.nombre.toLowerCase();
    const correo = c.correo.toLowerCase();
    const etiqueta = (c.etiqueta || "").toLowerCase();
    const telefono = c.telefono.toLowerCase();
    // El contacto aparece si el término está en cualquiera de estos campos
    return (
      nombre.includes(termino) ||
      correo.includes(termino) ||
      etiqueta.includes(termino) ||
      telefono.includes(termino)
    );
  });

  // 2. Ordenamos los contactos filtrados por nombre A-Z o Z-A
  // Usamos [...contactosFiltrados] para no mutar el estado original
  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    const nombreA = a.nombre.toLowerCase();
    const nombreB = b.nombre.toLowerCase();
    if (nombreA < nombreB) return ordenAsc ? -1 : 1;
    if (nombreA > nombreB) return ordenAsc ? 1 : -1;
    return 0;
  });

  return (
    <main className="min-h-screen bg-white">
      {/* Encabezado con degradado azul */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-400 px-6 py-10">
        <p className="text-xs font-bold text-blue-100 tracking-widest uppercase mb-1">
          Programa ADSO — Ficha {APP_INFO.ficha}
        </p>
        <h1 className="text-5xl font-black text-white">
          {APP_INFO.titulo} <span className="text-cyan-200">v8</span>
        </h1>
        <p className="text-blue-100 mt-2 text-sm">
          {APP_INFO.subtitulo}
        </p>
      </header>

      <section className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Mensaje de error global */}
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-300 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Mensaje de carga */}
        {cargando && (
          <div className="rounded-xl bg-blue-50 border border-blue-300 px-4 py-3 text-sm text-blue-600">
            Cargando contactos desde la API...
          </div>
        )}

        {/* Formulario para agregar contactos */}
        <div className="bg-white rounded-2xl p-6 border-2 border-blue-100 shadow-lg shadow-blue-50">
          <h2 className="text-lg font-bold text-blue-600 mb-4">➕ Nuevo contacto</h2>
          <FormularioContacto onAgregar={agregarContacto} />
        </div>

        {/* === NUEVO CLASE 10: Buscador y botón de orden === */}
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          {/* Input de búsqueda controlado por React */}
          <input
            type="text"
            className="w-full md:flex-1 rounded-xl border-2 border-blue-100 bg-blue-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
            placeholder="Buscar por nombre, correo, etiqueta o teléfono..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          {/* Botón que alterna entre A-Z y Z-A */}
          <button
            type="button"
            onClick={() => setOrdenAsc((prev) => !prev)}
            className="bg-blue-50 border-2 border-blue-100 text-blue-600 text-sm px-5 py-3 rounded-xl hover:bg-blue-100 transition font-medium"
          >
            {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
          </button>
        </div>

        {/* Contador de resultados */}
        <p className="text-xs text-gray-400 -mt-4">
          Mostrando {contactosOrdenados.length} {contactosOrdenados.length === 1 ? "contacto" : "contactos"}
        </p>

        {/* Lista de contactos filtrados y ordenados */}
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
            />
          ))}
        </div>

        {/* Pie de página */}
        <footer className="pt-4 text-xs text-gray-400 border-t border-gray-100">
          <p>Desarrollo Web – ReactJS | Proyecto Agenda ADSO</p>
          <p>Instructor: Gustavo Adolfo Bolaños Dorado</p>
        </footer>
      </section>
    </main>
  );
}
