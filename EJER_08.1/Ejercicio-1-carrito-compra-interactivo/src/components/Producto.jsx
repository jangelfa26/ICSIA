import React from 'react';

const Producto = ({ producto, onAgregar }) => {
  return (
    <div className="producto">
      <h3>{producto.nombre}</h3>
      <p>Precio: ${producto.precio}</p>
      <button
        className="boton-agregar"
        onClick={() => onAgregar(producto)}
      >
        Añadir al carrito
      </button>
    </div>
  );
};

export default Producto;
