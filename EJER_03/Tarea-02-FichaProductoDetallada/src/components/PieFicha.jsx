function PieFicha({ precio, enStock }) {
    if (!enStock) {
        return <p className="no-stock">No disponible</p>;
    }

    return (
        <>
            <div>
                <p>
                    Precio: {precio.valor} {precio.moneda}
                    {precio.enOferta && <span>¡OFERTA!</span>}
                </p>
            </div>
        </>
    );
}

export default PieFicha;