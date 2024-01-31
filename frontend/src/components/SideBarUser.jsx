import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdAccessTimeFilled } from "react-icons/md";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { PiProjectorScreenChartFill } from "react-icons/pi";
import { ImUser } from "react-icons/im";
import { ImUsers } from "react-icons/im";
import { FaPlus } from "react-icons/fa";
import LogoTaskUnity from "../images/logodos.png";
import "../styles/SideBarUser.css";

function SideBarAdmin() {

    // Estados para almacenar las selecciones actuales y los datos de la base de datos
    const [projects, setProjects] = useState([]);
    const [teams, setTeams] = useState([]);
    const [members, setMembers] = useState([]);

    const [selectedProject, setSelectedProject] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('');
    const [selectedMember, setSelectedMember] = useState('');

    // Función asincrónica para obtener los datos de la base de datos
    const fetchData = async () => {
        // Simulación de funciones para obtener datos de la base de datos
        const fetchProjects = async () => ['Proyecto 1', 'Proyecto 2', 'Proyecto 3'];
        const fetchTeams = async () => ['Equipo A', 'Equipo B', 'Equipo C'];
        const fetchMembers = async () => ['Miembro 1', 'Miembro 2', 'Miembro 3'];

        // Obtener los datos y actualizar los estados
        const projectsData = await fetchProjects();
        const teamsData = await fetchTeams();
        const membersData = await fetchMembers();

        setProjects(projectsData);
        setTeams(teamsData);
        setMembers(membersData);
    };

    useEffect(() => {
        // Llamar a la función fetchData al montar el componente
        fetchData();
    }, []); // El segundo argumento del useEffect (un array vacío) asegura que se llama solo una vez al montar el componente


    return (
        <>
            <div className="sidebar-user">
                <div className="container-nombre-user">
                    <h1 className="sidebar-nombre-user">Task Unity</h1>
                </div>
                <div>
                    <div className="logo-container-user">
                        <img src={LogoTaskUnity} alt="img" className="logo-img-user" />
                    </div>
                </div>
                <div className="rec-user">
                    <MdAccessTimeFilled />
                    <p>Proyectos recientes</p>
                </div>
                <br />
                <div className="fav-user">
                    <MdOutlineStarPurple500 />
                    <p>Proyectos favoritos</p>
                </div>


                <div className="list-container-user">
                    <div className="list-position-user">
                        <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)} className="list-style-user">
                            <option value="">Proyectos</option>
                            {projects.map((project, index) => (
                                <option key={index} value={project}>
                                    {project}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)} className="list-style-user">
                            <option value="">Equipos</option>
                            {teams.map((team, index) => (
                                <option key={index} value={team}>
                                    {team}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <select value={selectedMember} onChange={(e) => setSelectedMember(e.target.value)} className="list-style-user">
                            <option value="">Miembros</option>
                            {members.map((member, index) => (
                                <option key={index} value={member}>
                                    {member}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="container-buttons-user">
                    <div>
                        <button className="buttons-user">
                            <div className="button-content">
                                <PiProjectorScreenChartFill />
                                <br />
                                Proyecto Nuevo
                            </div>
                            <div className="button-hover-content">
                                <FaPlus />
                            </div>
                        </button>
                    </div>
                    <div>
                        <button className="buttons-user">
                            <div className="button-content">
                                <ImUsers />
                                <br />
                                Equipo Nuevo
                            </div>
                            <div className="button-hover-content">
                                <FaPlus />
                            </div>
                        </button>
                    </div>
                    <div>
                        <button className="buttons-user">
                            <div className="button-content">
                                <ImUser />
                                <br />
                                Añadir Miembros
                            </div>

                            <div className="button-hover-content">
                                <FaPlus />
                            </div>
                        </button>
                    </div>
                </div>


            </div>
        </>
    );
}

export default SideBarAdmin;