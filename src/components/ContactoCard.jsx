export default function ContactoCard({
  id, nombre, telefono, correo, etiqueta, onDelete,
}) {
  return (
    <article className="bg-white border rounded-lg shadow-sm p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-purple-800">
            {nombre}
          </h3>
          {etiqueta && (
            <span className="bg-purple-600 text-white text-xs rounded px-2 py-1">
              {etiqueta}
            </span>
          )}
          <p className="text-gray-600 text-sm mt-1">📞 {telefono}</p>
          {correo && (
            <p className="text-gray-600 text-sm">✉️ {correo}</p>
          )}
        </div>

        <button
          onClick={() => onDelete(id)}
          className="bg-red-500 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-md transition"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}