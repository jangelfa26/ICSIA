"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";

export default function DetalleMedicamento() {

    const { id } = useParams();
    const router = useRouter();

    const [medicamento, setMedicamento] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {

        if (!id) return;

        const cargar = async () => {

            try {

                const res = await fetch(
                    `/api/medicamentos/${id}`
                );

                if (!res.ok) {
                    setMedicamento(undefined);
                    return;
                }

                const data = await res.json();

                setMedicamento(data);

            } catch (error) {

                console.error(error);

                setMedicamento(undefined);

            } finally {

                setCargando(false);
            }
        };

        cargar();

    }, [id]);

    if (cargando) {
        return (
            <div className="container">
                <p>Cargando medicamento...</p>
            </div>
        );
    }

    if (medicamento === undefined) {
        notFound();
    }

    const getEstadoStock = () => {

        if (medicamento.stock <= 0) {
            return "stock-empty";
        }

        if (medicamento.stock <= 10) {
            return "stock-low";
        }

        return "stock-ok";
    };

    const getTextoStock = () => {

        if (medicamento.stock <= 0) {
            return "Sin stock";
        }

        if (medicamento.stock <= 10) {
            return "Stock bajo";
        }

        return "Disponible";
    };

    return (

        <div className="detalle-container">

            <div className="detalle-card">

                <div className="detalle-top">

                    <div>

                        <h1>{medicamento.nombre}</h1>

                        <p className="texto-gris">
                            Medicamento #{medicamento.id}
                        </p>

                    </div>

                    <span className={getEstadoStock()}>
                        {getTextoStock()}
                    </span>

                </div>

                <div className="detalle-section">

                    <h2>Información general</h2>

                    <p>
                        <b>Precio:</b>
                        {" "}
                        {Number(medicamento.precio).toFixed(2)} €
                    </p>

                    <p>
                        <b>Stock:</b>
                        {" "}
                        {medicamento.stock}
                    </p>

                </div>

                <div className="detalle-section">

                    <h2>Descripción</h2>

                    <p>
                        {medicamento.descripcion ||
                            "Sin descripción"}
                    </p>

                </div>

                <div className="detalle-acciones">

                    <button
                        className="btn"
                        onClick={() =>
                            router.push(
                                `/medicamentos/${medicamento.id}/editar`
                            )
                        }
                    >
                        Editar
                    </button>

                    <button
                        className="btn btn-cancel"
                        onClick={() =>
                            router.push("/medicamentos")
                        }
                    >
                        Volver
                    </button>

                </div>

            </div>

        </div>
    );
}