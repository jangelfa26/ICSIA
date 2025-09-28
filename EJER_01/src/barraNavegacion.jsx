import { useState } from 'react'

function Navbar() {
    return (
        <>
             <header className="bg-success">
                <nav className="navbar navbar-expand-lg navbar-dark container">
                    <a className="navbar-brand fw-bold" href="#">Naturaleza Viva</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navMenu">
                        <ul className="navbar-nav ms-3">
                            <li className="nav-item"><a className="nav-link" href="#">Inicio</a></li>
                            <li className="nav-item"><a className="nav-link" href="#">Proyectos</a></li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="recursosDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Recursos
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="recursosDropdown">
                                    <li><a className="dropdown-item" href="#">Categoría 1</a></li>
                                    <li><a className="dropdown-item" href="#">Categoría 2</a></li>
                                    <li><a className="dropdown-item" href="#">Categoría 3</a></li>
                                    <li><a className="dropdown-item" href="#">Categoría 4</a></li>
                                </ul>
                            </li>

                            <li className="nav-item"><a className="nav-link" href="#">Contacto</a></li>
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Navbar