function DetallesProducto({ caracteristicas, children }) {
    return (
        <>
            <div>
                <h4>Características:</h4>
                <ul>
                    {caracteristicas && caracteristicas.length > 0 ? (
                        caracteristicas.map((carac, i) => <li key={i}>{carac}</li>)
                    ) : (
                        <li>No hay características</li>
                    )}
                </ul>
                {children}
            </div>
        </>
    );
}

export default DetallesProducto;