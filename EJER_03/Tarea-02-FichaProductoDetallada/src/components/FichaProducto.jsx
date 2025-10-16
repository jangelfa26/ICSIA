import CabeceraFicha from './CabeceraFicha';
import ImagenProducto from './ImagenProducto';
import DetallesProducto from './DetallesProducto';
import PieFicha from './PieFicha';

function FichaProducto({ producto, children }) {
    const { nombre, vendedor, imagenes, caracteristicas, precio, enStock } = producto;

    return (
        <>
            <div className="ficha">
                <CabeceraFicha nombre={nombre} vendedor={vendedor} />
                <ImagenProducto url={imagenes[0]} alt={nombre} />
                <DetallesProducto caracteristicas={caracteristicas}>
                    {children}
                </DetallesProducto>
                <PieFicha precio={precio} enStock={enStock} />
            </div>
        </>
    );
}

export default FichaProducto;