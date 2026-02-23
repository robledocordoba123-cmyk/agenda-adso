export default function ProfilePreview({ perfil }) {
  const { nombre, rol, descripcion, imagen, colorPrimario, colorSecundario, redes } = perfil;
  return (
    <div className="preview-card" style={{ background: `linear-gradient(135deg, ${colorPrimario}22, ${colorSecundario}33)`, borderColor: colorPrimario }}>
      <img
        src={imagen || `https://ui-avatars.com/api/?name=${encodeURIComponent(nombre||"?")}&background=7c3aed&color=fff&size=120`}
        alt={nombre}
        className="preview-foto"
        onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(nombre||"?")}&background=7c3aed&color=fff&size=120`; }}
      />
      <h2 className="preview-nombre" style={{ color: colorPrimario }}>{nombre || "Tu nombre aquí"}</h2>
      <p className="preview-rol" style={{ background: colorSecundario, color: "#fff" }}>{rol || "Tu rol aquí"}</p>
      <p className="preview-descripcion">{descripcion || "Escribe una descripción..."}</p>
      <div className="preview-redes">
        {redes.filter((r) => r.activo).map((r) => (
          <span key={r.nombre} className="preview-red-badge" style={{ background: colorPrimario }}>{r.nombre}</span>
        ))}
      </div>
    </div>
  );
}