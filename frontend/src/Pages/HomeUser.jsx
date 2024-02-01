import React, { useState, useEffect } from 'react';
import SideBarUser from '../components/SideBarUser';
import HeaderUser from '../components/HeaderUser';
import '../styles/HomeUser.css';
import { FaPlus } from 'react-icons/fa';
import { MdDeleteForever, MdEditDocument } from 'react-icons/md';
import CreateProjectModal from '../components/CreateProjectModal';
// Importa la función setAppElement de react-modal
import Modal from 'react-modal';
// En tu punto de entrada (puede ser tu archivo index.js o App.js), agrega el siguiente código
Modal.setAppElement('#root'); // o el ID del elemento raíz de tu aplicación


const HomeUser = () => {
  const [projects, setProjects] = useState([]);

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

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <SideBarUser />
      <HeaderUser />
      <div className="container-home-user">
        <br />
        <div>
          <p>---- Equipos ----</p>
        </div>
        <div className="project-view-container">
          {projects.map((project, index) => (
            <div className="view-project" key={index}>
              <div className='view-project-decoration'>
                <br />
                <p>{project.nombre_proyecto}</p>
                <p>Estado: {project.nombre_estado}</p>
                <div className="icon-create-project">
                  <MdEditDocument className="edit-icon" />
                  <MdDeleteForever className="delete-icon" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeUser;
