import React, { useReducer, useMemo, useCallback } from 'react';
import './App.css';
import ListaProductos from './components/ListaProductos';
import Carrito from './components/Carrito';
import productosData from './data/productos.json';

const estadoInicial = {
  productosEnCarrito: []
};

const reducerCarrito = (estado, accion) => {
  switch (accion.tipo) {
    case 'AGREGAR_PRODUCTO': {
      const existe = estado.productosEnCarrito.find(p => p.id === accion.producto.id);

      if (existe) {
        return {
          ...estado,
          productosEnCarrito: estado.productosEnCarrito.map(p =>
            p.id === accion.producto.id
              ? { ...p, cantidad: p.cantidad + 1 }
              : p
          )
        };
      }

      return {
        ...estado,
        productosEnCarrito: [
          ...estado.productosEnCarrito,
          { ...accion.producto, cantidad: 1 }
        ]
      };
    }

    case 'ACTUALIZAR_CANTIDAD':
      return {
        ...estado,
        productosEnCarrito: estado.productosEnCarrito
          .map(p =>
            p.id === accion.id
              ? { ...p, cantidad: p.cantidad + accion.delta }
              : p
          )
          .filter(p => p.cantidad > 0)
      };

    case 'ELIMINAR_PRODUCTO':
      return {
        ...estado,
        productosEnCarrito: estado.productosEnCarrito.filter(p => p.id !== accion.id)
      };

    default:
      return estado;
  }
};

const App = () => {
  const [estadoCarrito, dispatch] = useReducer(reducerCarrito, estadoInicial);

  const agregarProducto = useCallback(
    (producto) => dispatch({ tipo: 'AGREGAR_PRODUCTO', producto }),
    []
  );

  const actualizarCantidad = useCallback(
    (id, delta) => dispatch({ tipo: 'ACTUALIZAR_CANTIDAD', id, delta }),
    []
  );

  const eliminarProducto = useCallback(
    (id) => dispatch({ tipo: 'ELIMINAR_PRODUCTO', id }),
    []
  );

  const totalCarrito = useMemo(() => {
    return estadoCarrito.productosEnCarrito
      .reduce((acc, p) => acc + p.precio * p.cantidad, 0)
      .toFixed(2);
  }, [estadoCarrito.productosEnCarrito]);

  return (
<div className="App">
  <h1>Ejercicio 1: Carrito de la Compra</h1>

  <div className="layout">
    <section>
      <h2 className="titulo-seccion">Productos Disponibles</h2>
      <ListaProductos productos={productosData} onAgregar={agregarProducto} />
    </section>

    <Carrito
      productos={estadoCarrito.productosEnCarrito}
      total={totalCarrito}
      onActualizarCantidad={actualizarCantidad}
      onEliminar={eliminarProducto}
    />
  </div>
</div>

  );
};

export default App;
