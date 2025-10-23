function SearchBar({ onBuscar }) {
  function manejarCambio(event) {
    onBuscar(event.target.value);
  }

  return (
    <input
      type="text"
      placeholder="Buscar usuario..."
      className="form-control mb-2"
      onChange={manejarCambio}
    />
  );
}

export default SearchBar;
