import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/StatsAdmin.css";
import "../styles/Tittle.css";
import { CgAlignBottom } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { FaUserTie } from "react-icons/fa6";
import { HiDocumentChartBar } from "react-icons/hi2";

const servidor = 'http://localhost:8081'
const ResourcesTable = () => {
    const [recursos, setRecursos] = useState([]);
    const [project, setProject] = useState([]);
    const [member, setMembers] = useState([]);
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({
        recursos: 0,
        usuarios: 0,
        proyectos: 0,
        miembros: 0,
        peticiones: 0
    });

    const ResponseData = async () => {
        try {
            const respuesta = await axios.get(servidor + '/recursos');
            const cantidadDatos = respuesta.data.recursos;
            const Datos = cantidadDatos.length;
            setRecursos(Datos);

            setStats(prevStats => ({
                ...prevStats,
                recursos: Datos
            }));
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };

    const ResponseDataUsers = async () => {
        try {
            const respuesta = await axios.get(servidor + '/usuarios');
            const results = respuesta.data.usuarios;
            const Datos = results.length;
            setUsers(Datos);

            setStats(prevStats => ({
                ...prevStats,
                usuarios: Datos
            }))

        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    }

    const ResponseDataProject = async () => {
        try {
            const respuesta = await axios.get(servidor + '/proyectos')
            const results = respuesta.data.proyectos;
            const Datos = results.length;

            setProject(Datos);

            setStats(prevStats => ({
                ...prevStats,
                proyectos: Datos
            }));
        } catch (error) {
            console.error('Error al obtener datos', error)
        }
    }


    const ResponseDataMembers = async () => {
        try {
            const respuesta = await axios.get(servidor + '/miembros');
            const results = respuesta.data.miembros;
            const count = results.length;

            setStats(prevStats => ({
                ...prevStats,
                miembros: count
            }));
        } catch (error) {
            console.error('Error al obtener datos de las peticiones:', error);
        }
    }


    const ResponseDataRequests = async () => {
        try {
            const respuesta = await axios.get(servidor + '/peticiones');
            const results = respuesta.data.peticiones;
            const count = results.length;

            setStats(prevStats => ({
                ...prevStats,
                peticiones: count
            }));
        } catch (error) {
            console.error('Error al obtener datos de las peticiones:', error);
        }
    }

    useEffect(() => {
        ResponseData();
        ResponseDataUsers();
        ResponseDataProject();
        ResponseDataMembers();
        ResponseDataRequests();
    }, [stats]);

    return (
        <div className="stats-table">
            <h1 className="tittle">Estadísticas Generales</h1>
            <div className="cards-stats-container">
                <div className="card-stats">
                    <br />
                    <span>Recursos</span>
                    <p className="info">Cantidad de recursos disponibles</p>
                    <CgAlignBottom className="icon-stats" />
                    <div className="share"></div>
                    <button>{stats.recursos}</button>
                </div>
                <div className="card-stats">
                    <br />
                    <span>Usuarios</span>
                    <p className="info">Cantidad de usuarios registrados</p>
                    <FaUsers className="icon-stats"/>
                    <div className="share"></div>
                    <button>{stats.usuarios}</button>
                </div>
                <div className="card-stats">
                    <br />
                    <span>Proyectos</span>
                    <p className="info">Cantidad de proyectos en curso</p>
                    <GrProjects className="icon-stats"/>
                    <div className="share"></div>
                    <button>{stats.proyectos}</button>
                </div>
                <div className="card-stats">
                    <br />
                    <span>Miembros</span>
                    <p className="info">Cantidad de miembros en equipos</p>
                    <FaUserTie className="icon-stats"/>
                    <div className="share"></div>
                    <button>{stats.miembros}</button>
                </div>
                <div className="card-stats">
                    <br />
                    <span>Peticiones</span>
                    <p className="info">Cantidad de peticiones realizadas</p>
                    <HiDocumentChartBar className="icon-stats"/>
                    <div className="share"></div>
                    <button>{stats.peticiones}</button>
                </div>
            </div>
        </div>
    );
};

export default ResourcesTable;
