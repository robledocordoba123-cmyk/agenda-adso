// Archivo: src/config.js
// Aquí centralizamos toda la configuración de la app.
// Si algo cambia (puerto, título, ficha), solo se toca este archivo.

// URL de la API local. Si cambia el puerto, solo se modifica aquí.
export const API_BASE_URL = "http://localhost:3001/contactos";

// Información general de la app que se usa en el encabezado
export const APP_INFO = {
  ficha: "3229209",
  titulo: "Agenda ADSO",
  version: "v7",
  subtitulo: "Gestión de contactos con validaciones y mejor experiencia de usuario.",
};