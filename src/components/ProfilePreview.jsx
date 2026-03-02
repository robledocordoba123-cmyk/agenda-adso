export default function ProfilePreview({ perfil }) {
  const {
    nombre,
    rol,
    descripcion,
    imagen,
    colorPrimario,
    colorSecundario,
    redes,
  } = perfil;

  return (
    <div
      className="border-2 rounded-2xl p-8 text-center shadow-lg
      flex flex-col items-center gap-3 transition"
      style={{
        background: `linear-gradient(135deg, ${colorPrimario}22, ${colorSecundario}33)`,
        borderColor: colorPrimario,
      }}
    >
      <img
        src={
          imagen ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            nombre || "?"
          )}&background=7c3aed&color=fff&size=120`
        }
        alt={nombre}
        className="w-28 h-28 rounded-full object-cover
        border-4 border-white shadow-md"
        onError={(e) => {
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            nombre || "?"
          )}&background=7c3aed&color=fff&size=120`;
        }}
      />

      <h2
        className="text-2xl font-bold m-0"
        style={{ color: colorPrimario }}
      >
        {nombre || "Tu nombre aquí"}
      </h2>

      <p
        className="px-4 py-1 rounded-full text-sm font-medium text-white m-0 shadow-sm"
        style={{ background: colorSecundario }}
      >
        {rol || "Tu rol aquí"}
      </p>

      <p className="text-sm text-gray-600 max-w-xs leading-relaxed m-0">
        {descripcion || "Escribe una descripción..."}
      </p>

      {/* 🔗 REDES SOCIALES FUNCIONALES */}
      <div className="flex flex-wrap gap-2 justify-center mt-2">
        {redes
          .filter((r) => r.activo && r.url)
          .map((r) => (
            <a
              key={r.nombre}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-full text-white text-xs font-semibold shadow-sm hover:scale-105 transition"
              style={{ background: colorPrimario }}
            >
              {r.nombre}
            </a>
          ))}
      </div>
    </div>
  );
}