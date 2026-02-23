import { useState, useEffect } from "react";
import "./App.css";
import ProfileForm from "./components/ProfileForm";
import ProfilePreview from "./components/ProfilePreview";

const INICIAL = {
  nombre: "Tu nombre",
  rol: "Aprendiz ADSO - SENA",
  descripcion: "Estudiando desarrollo de software en el SENA.",
  imagen: "",
  colorPrimario: "#7c3aed",
  colorSecundario: "#5b21b6",
  redes: [
    { nombre: "LinkedIn", activo: true },
    { nombre: "GitHub", activo: true },
    { nombre: "Instagram", activo: false },
    { nombre: "Twitter", activo: false },
    { nombre: "TikTok", activo: false },
  ],
};

export default function App() {
  const [perfil, setPerfil] = useState(
    JSON.parse(localStorage.getItem("perfil-digital")) || INICIAL
  );

  useEffect(() => {
    localStorage.setItem("perfil-digital", JSON.stringify(perfil));
  }, [perfil]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil((prev) => ({ ...prev, [name]: value }));
  };

  const toggleRed = (nombre) => {
    setPerfil((prev) => ({
      ...prev,
      redes: prev.redes.map((r) =>
        r.nombre === nombre ? { ...r, activo: !r.activo } : r
      ),
    }));
  };

  return (
    <div className="taller-container">
      <header className="taller-header">
        <h1>🪪 Creador de Perfil Digital</h1>
        <p>Taller Clase 6 – Agenda ADSO | Ficha 3229207</p>
      </header>
      <div className="taller-layout">
        <ProfileForm perfil={perfil} onChange={handleChange} onToggleRed={toggleRed} />
        <div className="preview-columna">
          <h2 className="preview-titulo">👁️ Vista previa en tiempo real</h2>
          <ProfilePreview perfil={perfil} />
          <p className="preview-nota">Los cambios se guardan automáticamente 💾</p>
        </div>
      </div>
    </div>
  );
}