import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/StatsAdmin.css";
import "../styles/Tittle.css";

const ResourcesTable = () => {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [recursosResp, usuariosResp, proyectosResp, miembrosResp, peticionesResp] = await Promise.all([
                    axios.get("/recursos"),
                    axios.get("/usuarios"),
                    axios.get("/proyectos"),
                    axios.get("/miembros"),
                    axios.get("/peticiones")
                ]);

                const recursosCount = recursosResp.data.recursos.length;
                const usuariosCount = usuariosResp.data.usuarios.length;
                const proyectosCount = proyectosResp.data.proyectos.length;
                const miembrosCount = miembrosResp.data.miembros.length;
                const peticionesCount = peticionesResp.data.peticiones.length;

                setStats([
                    { nombre: "Recursos", cantidad: recursosCount },
                    { nombre: "Usuarios", cantidad: usuariosCount },
                    { nombre: "Proyectos", cantidad: proyectosCount },
                    { nombre: "Miembros", cantidad: miembrosCount },
                    { nombre: "Peticiones", cantidad: peticionesCount }
                ]);
            } catch (error) {
                console.error("Error al obtener estadísticas:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="stats-table">
            <h1 className="tittle">Estadísticas Generales</h1>
            <div className="cards-stats-container">
                {stats.map((item, index) => (
                    <div key={index} className="card-stats">
                        <div className="img"></div>
                        <span>{item.nombre}</span>
                        <p className="info">{`Cantidad de ${item.nombre.toLowerCase()} disponibles`}</p>
                        <div className="share"></div>
                        <button>{item.cantidad}</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResourcesTable;
