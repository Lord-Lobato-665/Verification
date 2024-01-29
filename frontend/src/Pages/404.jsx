import React from "react";
import { Link } from "react-router-dom";
import "../styles/404.css";
import Image404 from "../images/image-404.png";

function PageNotFound() {
    return (
        <>
            <body>
                <div className="container-404">
                    <h1>404</h1>
                    <h2>Página no encontrada</h2>
                    <h3>¡Vaya! Parece que te has desviado. Regresa a nuestra página de inicio y comienza de nuevo.</h3>
                </div>
                <div className="logo-container-404">
                    <img src={Image404} alt="img" className="logo-img-404" />
                </div>
                <dir className="buttom-404">
                    <Link to="/Admin">
                    <button>
                        <span class="shadow"></span>
                        <span class="edge"></span>
                        <span class="front text"> Regresar a Inicio
                        </span>
                    </button>
                    </Link>
                </dir>
            </body>

        </>
    )
}

export default PageNotFound