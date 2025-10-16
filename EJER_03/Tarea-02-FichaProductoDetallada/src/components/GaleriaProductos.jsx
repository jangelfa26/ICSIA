import FichaProducto from './FichaProducto';

function GaleriaProductos({ productos }) {
    return (
        <>
            <div className="galeria">
                {productos.map((producto) => (
                    <FichaProducto key={producto.id} producto={producto}>
                        <button>Más información</button>
                    </FichaProducto>
                ))}
            </div>
        </>

    );
}

export default GaleriaProductos;