// Archivo: src/context/AuthContext.jsx
// Este archivo maneja el estado global de autenticación de la app.
// Permite saber desde cualquier componente si el usuario está logueado o no.

import { createContext, useContext, useState } from "react"

// Creamos el contexto global de autenticación
const AuthContext = createContext()

// AuthProvider envuelve toda la app para compartir el estado de sesión
export function AuthProvider({ children }) {

  // Leemos localStorage para saber si el usuario ya tenía sesión activa
  // Si auth === "true" en localStorage, el usuario ya estaba logueado
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("auth") === "true"
  )

  // Función login: guarda la sesión en localStorage y actualiza el estado
  const login = () => {
    localStorage.setItem("auth", "true")
    setIsAuthenticated(true)
  }

  // Función logout: elimina la sesión de localStorage y actualiza el estado
  const logout = () => {
    localStorage.removeItem("auth")
    setIsAuthenticated(false)
  }

  // Proveemos isAuthenticated, login y logout a toda la app
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado para usar el contexto fácilmente en cualquier componente
export function useAuth() {
  return useContext(AuthContext)
}