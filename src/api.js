// Archivo: src/api.js
// Capa de datos: aquí van todas las peticiones HTTP a la API.
// Importamos la URL desde config.js para no repetirla en cada función
import { API_BASE_URL } from "./config";

// GET: trae todos los contactos guardados en db.json
export async function listarContactos() {
  const res = await fetch(API_BASE_URL);
  if (!res.ok) throw new Error("Error al listar contactos");
  return res.json();
}

// POST: crea un contacto nuevo y lo guarda en db.json
export async function crearContacto(data) {
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear el contacto");
  return res.json();
}

// DELETE: elimina un contacto por su id de db.json
export async function eliminarContactoPorId(id) {
  const res = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar el contacto");
  return true;
}