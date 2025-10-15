export function FichaProducto({ producto }) {
    return (
        <div className="tarjeta">
            <img src={producto.imagenURL} alt={producto.nombre} />
            <h2>{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
            <p>{producto.precio} €</p>
        </div>
    );
}

export default FichaProducto;