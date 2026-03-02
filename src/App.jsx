import { useEffect, useState } from "react";
import { listarContactos, crearContacto, eliminarContactoPorId } from "./api.js";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarContactos() {
      try {
        const data = await listarContactos();
        setContactos(data);
      } catch (error) {
        setError("No se pudo cargar la lista de contactos");
      } finally {
        setCargando(false);
      }
    }
    cargarContactos();
  }, []);

  const agregarContacto = async (nuevo) => {
    try {
      const creado = await crearContacto(nuevo);
      setContactos((prev) => [...prev, creado]);
    } catch (error) {
      setError("No se pudo agregar el contacto");
    }
  };

  const eliminarContacto = async (id) => {
    try {
      await eliminarContactoPorId(id);
      setContactos((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      setError("No se pudo eliminar el contacto");
    }
  };

  return (
  
    <main className="min-h-screen bg-white">
      <header className="bg-gradient-to-r from-blue-600 to-cyan-400 px-6 py-10">
        <p className="text-xs font-bold text-blue-100 tracking-widest uppercase mb-1">
          Programa ADSO
        </p>
        <h1 className="text-5xl font-black text-white">
          Agenda ADSO <span className="text-cyan-200">v5</span>
        </h1>
        <p className="text-blue-100 mt-2 text-sm">
          Conectada a una API local con JSON Server.
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
            <ContactoCard key={c.id} {...c} onEliminar={() => eliminarContacto(c.id)} />
          ))}
        </div>
      </section>
    </main>

  );
}