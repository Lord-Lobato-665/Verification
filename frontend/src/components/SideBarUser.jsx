import React, { useState, useEffect } from 'react';
import { MdAccessTimeFilled } from 'react-icons/md';
import { MdOutlineStarPurple500 } from 'react-icons/md';
import { PiProjectorScreenChartFill } from 'react-icons/pi';
import { ImUser } from 'react-icons/im';
import { ImUsers } from 'react-icons/im';
import { FaPlus } from 'react-icons/fa';
import LogoTaskUnity from '../images/logodos.png';
import '../styles/SideBarUser.css';

function SideBarUser() {
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedMember, setSelectedMember] = useState('');

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:8081/obtenerProyectos');
      const data = await response.json();
      if (data.Estatus === 'Exitoso') {
        setProjects(data.contenido);
      } else {
        console.error('Error al obtener proyectos');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const fetchTeams = async () => {
    // Lógica para obtener equipos, si es necesario
  };

  const fetchMembers = async () => {
    // Lógica para obtener miembros, si es necesario
  };

  useEffect(() => {
    fetchProjects();
    // Llamadas adicionales para obtener equipos y miembros, si es necesario
  }, []);

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

          <div>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="list-style-user"
            >
              <option value="">Equipos</option>
              {teams.map((team, index) => (
                <option key={index} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="list-style-user"
            >
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

export default SideBarUser;
