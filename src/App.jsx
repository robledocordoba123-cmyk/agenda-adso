// Archivo: src/App.jsx
// Componente principal. Se encarga de:
// - Cargar contactos desde la API al abrir la app
// - Manejar estados globales (contactos, carga, error)
// - Conectar el formulario y las tarjetas
import { useEffect, useState } from "react";
import { listarContactos, crearContacto, eliminarContactoPorId } from "./api.js";
import { APP_INFO } from "./config";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Se ejecuta una sola vez al abrir la app (GET)
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

  return (
    <main className="min-h-screen bg-white">
      {/* Encabezado — usa APP_INFO desde config.js */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-400 px-6 py-10">
        <p className="text-xs font-bold text-blue-100 tracking-widest uppercase mb-1">
          Programa ADSO — Ficha {APP_INFO.ficha}
        </p>
        <h1 className="text-5xl font-black text-white">
          {APP_INFO.titulo} <span className="text-cyan-200">{APP_INFO.version}</span>
        </h1>
        <p className="text-blue-100 mt-2 text-sm">
          {APP_INFO.subtitulo}
        </p>
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

        <div className="bg-white rounded-2xl p-6 border-2 border-blue-100 shadow-lg shadow-blue-50">
          <h2 className="text-lg font-bold text-blue-600 mb-4">➕ Nuevo contacto</h2>
          <FormularioContacto onAgregar={agregarContacto} />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800">
            📋 Contactos <span className="text-cyan-500">({contactos.length})</span>
          </h2>
          {contactos.length === 0 && !cargando && (
            <p className="text-gray-400 text-sm">No hay contactos aún.</p>
          )}
          {contactos.map((c) => (
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
