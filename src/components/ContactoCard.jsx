// Archivo: src/components/ContactoCard.jsx
export default function ContactoCard({ nombre, telefono, correo, etiqueta, onEliminar, onEditar }) {
  return (
    <div className="bg-white border-2 border-blue-100 rounded-2xl p-6 flex items-start justify-between hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-50 transition">
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-blue-700">{nombre}</h3>
        <p className="text-gray-500 text-sm flex items-center gap-2">
          <span>📞</span> {telefono}
        </p>
        <p className="text-gray-500 text-sm flex items-center gap-2">
          <span>✉️</span> {correo}
        </p>
        {etiqueta && (
          <span className="inline-block bg-cyan-50 text-cyan-600 border border-cyan-300 text-xs px-3 py-1 rounded-full mt-2">
            {etiqueta}
          </span>
        )}
      </div>

      {/* NUEVO CLASE 11: botones Editar y Eliminar */}
      <div className="flex gap-2">
        <button
          onClick={onEditar}
          className="bg-blue-50 hover:bg-blue-100 text-blue-600 border-2 border-blue-200 text-sm px-4 py-2 rounded-lg transition"
        >
          Editar
        </button>
        <button
          onClick={onEliminar}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg shadow transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}