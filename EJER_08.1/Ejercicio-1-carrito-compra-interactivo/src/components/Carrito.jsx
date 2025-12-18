import React from 'react';

const Carrito = ({ productos, total, onActualizarCantidad, onEliminar }) => {
  return (
<div className="carrito">
  <h2>Mi Carrito</h2>

  {productos.map(producto => (
    <div key={producto.id} className="item-carrito">
      <div className="info">
        <p className="nombre">{producto.nombre}</p>
        <p className="detalle">
          ${producto.precio.toFixed(2)} x {producto.cantidad} ={" "}
          <strong>${(producto.precio * producto.cantidad).toFixed(2)}</strong>
        </p>
      </div>

      <div className="acciones">
        <button onClick={() => onActualizarCantidad(producto.id, -1)}>-</button>
        <button onClick={() => onActualizarCantidad(producto.id, 1)}>+</button>
        <button className="boton-eliminar" onClick={() => onEliminar(producto.id)}>
          Eliminar
        </button>
      </div>
    </div>
  ))}

  <div className="total">Total: ${total}</div>
</div>

  );
};

export default Carrito;
