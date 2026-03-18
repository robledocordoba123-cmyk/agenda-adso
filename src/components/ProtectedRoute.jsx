// Archivo: src/components/ProtectedRoute.jsx
// Componente guardián que protege las rutas privadas de la aplicación.
// Si el usuario no está autenticado, lo redirige automáticamente al login.
// Si está autenticado, muestra el contenido solicitado normalmente.

import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function ProtectedRoute({ children }) {
  // Obtenemos el estado de autenticación desde el contexto global
  const { isAuthenticated } = useAuth()

  // Si el usuario NO está autenticado, lo mandamos al login
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  // Si SÍ está autenticado, mostramos el contenido protegido
  return children
}