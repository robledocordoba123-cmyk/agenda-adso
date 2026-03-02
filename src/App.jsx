import { useState, useEffect } from "react";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  const [contactos, setContactos] = useState(() => {
    const guardado = localStorage.getItem("contactos-agenda");
    return guardado ? JSON.parse(guardado) : [];
  });

  // guarda automáticamente cada vez que cambia la lista
  useEffect(() => {
    localStorage.setItem("contactos-agenda", JSON.stringify(contactos));
  }, [contactos]);

  const agregarContacto = (nuevoContacto) => {
    setContactos((prev) => [
      ...prev,
      { ...nuevoContacto, id: Date.now() },
    ]);
  };

  const eliminarContacto = (id) => {
    setContactos((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="text-center py-6">
        <h1 className="text-3xl font-bold text-purple-700">
          📒 Agenda ADSO v4
        </h1>
        <p className="bg-purple-600 text-white text-xs rounded px-2 py-1 w-fit mx-auto mt-2">
          ADSO
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Taller Clase 6 - Agenda ADSO | Ficha 3229209
        </p>
      </header>

      {/* MAIN */}
      <main className="max-w-2xl mx-auto px-4 pb-10">
        <FormularioContacto onAgregar={agregarContacto} />

        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          📋 Contactos guardados ({contactos.length})
        </h2>

        {contactos.length === 0 && (
          <p className="text-gray-400 text-center text-sm mt-6">
            No hay contactos aún. ¡Agrega el primero!
          </p>
        )}

        {contactos.map((c) => (
          <ContactoCard
            key={c.id}
            {...c}
            onDelete={eliminarContacto}
          />
        ))}
      </main>
    </div>
  );
}