export default function ProfileForm({ perfil, onChange, onToggleRed }) {
  return (
    <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
      <h2 className="form-titulo">✏️ Personaliza tu perfil</h2>
      <div className="form-grupo"><label>Nombre</label><input name="nombre" value={perfil.nombre} onChange={onChange} placeholder="Ej: Samuel Ríos" /></div>
      <div className="form-grupo"><label>Rol / Profesión</label><input name="rol" value={perfil.rol} onChange={onChange} placeholder="Ej: Aprendiz ADSO" /></div>
      <div className="form-grupo"><label>Descripción</label><textarea name="descripcion" value={perfil.descripcion} onChange={onChange} rows={3} placeholder="Cuéntanos algo sobre ti..." /></div>
      <div className="form-grupo"><label>URL de imagen</label><input name="imagen" value={perfil.imagen} onChange={onChange} placeholder="https://mi-foto.jpg" /></div>
      <div className="form-colores">
        <div className="form-grupo"><label>Color primario</label><input type="color" name="colorPrimario" value={perfil.colorPrimario} onChange={onChange} /></div>
        <div className="form-grupo"><label>Color secundario</label><input type="color" name="colorSecundario" value={perfil.colorSecundario} onChange={onChange} /></div>
      </div>
      <div className="form-grupo">
        <label>Redes sociales</label>
        <div className="redes-lista">
          {perfil.redes.map((red) => (
            <label key={red.nombre} className="red-item">
              <input type="checkbox" checked={red.activo} onChange={() => onToggleRed(red.nombre)} />
              {red.nombre}
            </label>
          ))}
        </div>
      </div>
    </form>
  );
}