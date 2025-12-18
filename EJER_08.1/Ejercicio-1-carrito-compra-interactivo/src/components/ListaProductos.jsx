import React from 'react';
import Producto from './Producto';

const ListaProductos = ({ productos, onAgregar }) => {
  return (
    <div className="lista-productos">
      {productos.map(producto => (
        <Producto
          key={producto.id}
          producto={producto}
          onAgregar={onAgregar}
        />
      ))}
    </div>
  );
};

export default ListaProductos;
