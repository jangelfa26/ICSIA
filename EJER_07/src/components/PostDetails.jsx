import React, { useEffect, useState } from "react";

export default function DetallesPost({ postId }) {
    const [post, setPost] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        if (!postId) return;

        const cargarPost = async () => {
            setCargando(true);
            try {
                const respuesta = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
                const datos = await respuesta.json();
                setPost(datos);
            } catch (error) {
                console.error("Error cargando el post:", error);
            } finally {
                setCargando(false);
            }
        };

        cargarPost();
    }, [postId]);

    if (cargando) {
        return <p>Cargando post...</p>;
    }
    if (!post) {
        return <p>No se encontró el post.</p>;
    }

    return (
        <div>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
        </div>
    );
}
