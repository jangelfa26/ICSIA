import { useState } from "react";

function SearchBar({ terminoBusqueda, setTerminoBusqueda }) {
    return <>
        <div className="text-center mb-3">
            <input type="text" className="form-control w-50 mx-auto text-center bg-dark text-light border-secondary" placeholder="Buscar artículo..." value={terminoBusqueda} onChange={(evento) => setTerminoBusqueda(evento.target.value)}/>
        </div>
    </>
}

export default SearchBar;
