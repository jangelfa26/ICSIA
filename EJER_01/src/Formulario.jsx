import { useState } from 'react'

function Form() {

    return (
        <>
            <section className="bg-light py-5">
                <div className="container">
                    <h2 className="text-success fw-bold mb-4">Solicita más información</h2>
                    <form className="bg-white p-4 rounded shadow">
                        <div className="mb-3">
                            <label className="form-label">Nombre completo</label>
                            <input type="text" className="form-control" placeholder="Tu nombre" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Correo electrónico</label>
                            <input type="email" className="form-control" placeholder="nombre@ejemplo.com" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Mensaje</label>
                            <textarea className="form-control" rows="6" placeholder="Escribe tu consulta aquí..."></textarea>
                        </div>
                        <button type="submit" className="btn btn-success">Enviar solicitud</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Form
