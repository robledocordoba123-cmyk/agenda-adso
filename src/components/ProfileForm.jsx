export default function ProfileForm({ perfil, onChange, onToggleRed }) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="bg-white shadow-md rounded-2xl p-6 flex flex-col gap-4 border border-gray-200"
    >
      <h2 className="text-morado font-semibold text-lg">
        ✏️ Personaliza tu perfil
      </h2>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">Nombre</label>
        <input
          name="nombre"
          value={perfil.nombre}
          onChange={onChange}
          placeholder="Ej: Samuel Ríos"
          className="border border-gray-300 rounded-lg p-2 text-sm
          focus:outline-none focus:ring-2 focus:ring-morado
          transition"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">
          Rol / Profesión
        </label>
        <input
          name="rol"
          value={perfil.rol}
          onChange={onChange}
          placeholder="Ej: Aprendiz ADSO"
          className="border border-gray-300 rounded-lg p-2 text-sm
          focus:outline-none focus:ring-2 focus:ring-morado
          transition"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">
          Descripción
        </label>
        <textarea
          name="descripcion"
          value={perfil.descripcion}
          onChange={onChange}
          rows={3}
          placeholder="Cuéntanos algo sobre ti..."
          className="border border-gray-300 rounded-lg p-2 text-sm resize-y
          focus:outline-none focus:ring-2 focus:ring-morado
          transition"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">
          URL de imagen
        </label>
        <input
          name="imagen"
          value={perfil.imagen}
          onChange={onChange}
          placeholder="https://mi-foto.jpg"
          className="border border-gray-300 rounded-lg p-2 text-sm
          focus:outline-none focus:ring-2 focus:ring-morado
          transition"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700">
            Color primario
          </label>
          <input
            type="color"
            name="colorPrimario"
            value={perfil.colorPrimario}
            onChange={onChange}
            className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer p-1"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700">
            Color secundario
          </label>
          <input
            type="color"
            name="colorSecundario"
            value={perfil.colorSecundario}
            onChange={onChange}
            className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer p-1"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">
          Redes sociales
        </label>

        <div className="flex flex-wrap gap-2">
          {perfil.redes.map((red) => (
            <label
              key={red.nombre}
              className="flex items-center gap-2 text-sm
              bg-gray-100 px-3 py-1 rounded-full border border-gray-200
              cursor-pointer hover:bg-morado/10 transition"
            >
              <input
                type="checkbox"
                checked={red.activo}
                onChange={() => onToggleRed(red.nombre)}
              />
              {red.nombre}
            </label>
          ))}
        </div>
      </div>
    </form>
  );
}