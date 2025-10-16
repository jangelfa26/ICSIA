function ImagenProducto({ url, alt }) {
    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <img src={url} alt={alt || 'imagen del producto'} />
            </div>
        </>
    );
}

export default ImagenProducto;