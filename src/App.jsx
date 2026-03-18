// Archivo: src/App.jsx
// Clase 13 - Login y rutas protegidas en React
// Este archivo define las rutas de la aplicación y el componente Dashboard.
// La ruta /login es pública y la ruta / está protegida con ProtectedRoute.

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  listarContactos,
  crearContacto,
  actualizarContacto,
  eliminarContactoPorId,
} from "./api.js";
import { APP_INFO } from "./config";
import { useAuth } from "./context/AuthContext";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";

// Dashboard: componente principal que solo ven los usuarios autenticados
function Dashboard() {
  // Obtenemos la función logout del contexto para cerrar sesión
  const { logout } = useAuth();

  // Estado con todos los contactos obtenidos desde la API remota en Render
  const [contactos, setContactos] = useState([]);
  // Estado de carga mientras se consulta la API
  const [cargando, setCargando] = useState(true);
  // Estado para mostrar mensajes de error globales
  const [error, setError] = useState("");
  // Estado del término de búsqueda
  const [busqueda, setBusqueda] = useState("");
  // Estado del orden de la lista: true = A-Z, false = Z-A
  const [ordenAsc, setOrdenAsc] = useState(true);
  // Estado del contacto que se está editando
  const [contactoEnEdicion, setContactoEnEdicion] = useState(null);
  // Estado de la vista actual: "crear" o "contactos"
  const [vista, setVista] = useState("crear");

  // Cargamos los contactos al iniciar el Dashboard
  useEffect(() => {
    async function cargarContactos() {
      try {
        setCargando(true);
        setError("");
        const data = await listarContactos();
        setContactos(data);
      } catch (error) {
        console.error("Error al cargar contactos:", error);
        setError("No se pudieron cargar los contactos. Verifica que JSON Server esté encendido.");
      } finally {
        setCargando(false);
      }
    }
    cargarContactos();
  }, []);

  // Crear contacto: llama a la API y agrega el nuevo contacto al estado
  const agregarContacto = async (nuevo) => {
    try {
      setError("");
      const creado = await crearContacto(nuevo);
      setContactos((prev) => [...prev, creado]);
    } catch (error) {
      console.error("Error al crear contacto:", error);
      setError("No se pudo guardar el contacto. Verifica tu conexión o el servidor.");
      throw error;
    }
  };

  // Actualizar contacto: llama a la API y reemplaza el contacto en el estado
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

  // Eliminar contacto: llama a la API y lo quita del estado local
  const eliminarContacto = async (id) => {
    try {
      setError("");
      await eliminarContactoPorId(id);
      setContactos((prev) => prev.filter((c) => c.id !== id));
      setContactoEnEdicion((actual) => (actual && actual.id === id ? null : actual));
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
      setError("No se pudo eliminar el contacto. Vuelve a intentarlo.");
    }
  };

  // Activa el modo edición con el contacto seleccionado
  const onEditarClick = (contacto) => {
    setContactoEnEdicion(contacto);
    setError("");
  };

  // Cancela la edición y vuelve al modo normal
  const onCancelarEdicion = () => {
    setContactoEnEdicion(null);
  };

  // Cambia a la vista de ver contactos
  const irAVerContactos = () => {
    setVista("contactos");
    setContactoEnEdicion(null);
  };

  // Vuelve a la vista de crear contacto
  const irACrearContacto = () => {
    setVista("crear");
    setContactoEnEdicion(null);
    setBusqueda("");
  };

  // Filtramos los contactos según el término de búsqueda
  const contactosFiltrados = contactos.filter((c) => {
    const termino = busqueda.toLowerCase();
    return (
      c.nombre.toLowerCase().includes(termino) ||
      c.correo.toLowerCase().includes(termino) ||
      (c.etiqueta || "").toLowerCase().includes(termino) ||
      c.telefono.toLowerCase().includes(termino)
    );
  });

  // Ordenamos los contactos filtrados por nombre A-Z o Z-A
  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    const nombreA = a.nombre.toLowerCase();
    const nombreB = b.nombre.toLowerCase();
    if (nombreA < nombreB) return ordenAsc ? -1 : 1;
    if (nombreA > nombreB) return ordenAsc ? 1 : -1;
    return 0;
  });

  const estaEnVistaCrear = vista === "crear";
  const estaEnVistaContactos = vista === "contactos";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">

      {/* Barra superior con botón de cerrar sesión */}
      <header className="border-b border-slate-800 bg-slate-950/60 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-lg font-bold shadow-md">
              A
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Proyecto ABP</p>
              <h1 className="text-sm md:text-base font-semibold text-slate-50">
                Agenda ADSO – ReactJS
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">SENA CTMA</p>
              <p className="text-xs text-slate-200">Ficha {APP_INFO.ficha}</p>
            </div>
            {/* Al hacer clic en este botón se ejecuta logout() del contexto */}
            <button
              onClick={logout}
              className="text-xs px-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 pb-14">
        <div className="grid gap-8 md:grid-cols-[1.6fr,1fr] items-start">
          <div className="bg-white/95 rounded-3xl shadow-2xl border border-slate-100 px-6 py-7 md:px-8 md:py-8">
            <header className="mb-5 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                  {APP_INFO.titulo}
                </h2>
                <p className="text-sm text-gray-600 mt-1">{APP_INFO.subtitulo}</p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 border border-blue-100">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-xs font-medium text-blue-800">
                    JSON Server conectado · {contactos.length} contacto{contactos.length !== 1 && "s"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-[11px] uppercase tracking-[0.16em] text-gray-400">
                  {estaEnVistaCrear ? "Modo creación" : "Modo contactos"}
                </span>
                {estaEnVistaCrear ? (
                  <button
                    type="button"
                    onClick={irAVerContactos}
                    className="text-xs md:text-sm px-4 py-2 rounded-xl border border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    Ver contactos
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={irACrearContacto}
                    className="text-xs md:text-sm px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100"
                  >
                    Volver a crear contacto
                  </button>
                )}
              </div>
            </header>

            {error && (
              <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            )}

            {cargando ? (
              <p className="text-sm text-gray-500">Cargando contactos...</p>
            ) : (
              <>
                {estaEnVistaCrear && (
                  <FormularioContacto
                    onAgregar={agregarContacto}
                    onActualizar={actualizarContactoHandler}
                    contactoEnEdicion={null}
                    onCancelarEdicion={onCancelarEdicion}
                  />
                )}

                {estaEnVistaContactos && (
                  <>
                    {contactoEnEdicion && (
                      <div className="mb-4">
                        <FormularioContacto
                          onAgregar={agregarContacto}
                          onActualizar={actualizarContactoHandler}
                          contactoEnEdicion={contactoEnEdicion}
                          onCancelarEdicion={onCancelarEdicion}
                        />
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                      <div className="flex-1">
                        <input
                          type="text"
                          className="w-full rounded-xl border-2 border-blue-100 bg-blue-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                          placeholder="Buscar por nombre, correo, etiqueta o teléfono..."
                          value={busqueda}
                          onChange={(e) => setBusqueda(e.target.value)}
                        />
                        <p className="mt-1 text-[11px] text-gray-500">
                          Mostrando {contactosOrdenados.length} de {contactos.length} contacto{contactos.length !== 1 && "s"}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setOrdenAsc((prev) => !prev)}
                        className="bg-blue-50 border-2 border-blue-100 text-blue-600 text-sm px-5 py-3 rounded-xl hover:bg-blue-100 transition font-medium whitespace-nowrap"
                      >
                        {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
                      </button>
                    </div>

                    <section className="space-y-3">
                      {contactosOrdenados.length === 0 ? (
                        <p className="text-sm text-gray-500">
                          No se encontraron contactos que coincidan con la búsqueda.
                        </p>
                      ) : (
                        contactosOrdenados.map((c) => (
                          <ContactoCard
                            key={c.id}
                            {...c}
                            onEliminar={() => eliminarContacto(c.id)}
                            onEditar={() => onEditarClick(c)}
                          />
                        ))
                      )}
                    </section>
                  </>
                )}
              </>
            )}
          </div>

          <aside className="space-y-4 md:space-y-5">
            <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white p-6 shadow-xl flex flex-col justify-between min-h-[220px]">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-blue-100/80">Proyecto ABP</p>
                <h2 className="text-lg font-bold mt-2">Agenda ADSO – Dashboard</h2>
                <p className="text-sm text-blue-100 mt-1">
                  CRUD completo con React, JSON Server, validaciones, búsqueda, ordenamiento y edición.
                </p>
              </div>
              <div className="mt-6 space-y-2 text-sm">
                <p className="flex items-center justify-between">
                  <span className="text-blue-100">Contactos registrados</span>
                  <span className="font-semibold text-white text-base">{contactos.length}</span>
                </p>
                <p className="text-[11px] text-blue-100/80">
                  Usa este proyecto como evidencia en tu portafolio de Desarrollo Web – ReactJS.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-white/90 border border-slate-100 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900">Tips de código limpio</h3>
              <ul className="mt-2 text-xs text-gray-600 space-y-1">
                <li>• Nombra componentes según su responsabilidad.</li>
                <li>• Evita duplicar lógica, extrae funciones reutilizables.</li>
                <li>• Comenta la intención, no cada línea obvia.</li>
                <li>• Mantén archivos pequeños y coherentes.</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-slate-900 border border-slate-700 p-4 text-slate-100 shadow-sm">
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">SENA CTMA · ADSO</p>
              <p className="text-sm font-semibold mt-2">Desarrollo Web – ReactJS</p>
              <p className="text-xs text-slate-400 mt-3">
                "Pequeños proyectos bien cuidados valen más que mil ideas sin código. Agenda ADSO es tu carta de presentación como desarrolladora."
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

// App: define las rutas públicas y protegidas de la aplicación
export default function App() {
  return (
    <Routes>
      {/* Ruta pública: cualquiera puede ver el login */}
      <Route path="/login" element={<Login />} />

      {/* Ruta protegida: solo usuarios autenticados pueden ver el Dashboard */}
      <Route path="/" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
}