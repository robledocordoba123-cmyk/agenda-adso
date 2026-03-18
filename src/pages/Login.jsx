import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email === "admin@sena.com" && password === "1234") {
      login()
      navigate("/")
    } else {
      alert("Credenciales incorrectas")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl px-8 py-10 w-full max-w-md">

        {/* Logo igual al dashboard */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-md">
            A
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Proyecto ABP</p>
            <p className="text-sm font-semibold text-slate-800">Agenda ADSO – ReactJS</p>
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Iniciar sesión</h1>
        <p className="text-sm text-gray-500 mb-6">Ingresa tus credenciales para continuar</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-4 py-3 text-sm transition"
          >
            Iniciar sesión
          </button>

          {/* Credenciales de prueba */}
          <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-center">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mb-1">Credenciales de prueba</p>
            <p className="text-xs text-slate-600">📧 admin@sena.com</p>
            <p className="text-xs text-slate-600">🔑 1234</p>
          </div>
        </form>
      </div>
    </div>
  )
}