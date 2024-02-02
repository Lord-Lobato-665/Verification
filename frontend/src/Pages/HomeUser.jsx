import React, { useState, useEffect } from 'react';
import SideBarUser from '../components/SideBarUser';
import HeaderUser from '../components/HeaderUser';
import '../styles/HomeUser.css';
import { MdDeleteForever, MdEditDocument } from 'react-icons/md';
import Modal from 'react-modal';
import { Alert, AlertTitle } from '@mui/material'; // Importa los componentes de Material-UI Alert

Modal.setAppElement('#root');

const HomeUser = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [editedTeam, setEditedTeam] = useState(null);
  const [estados, setEstados] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const fetchTeams = async () => {
    try {
      const response = await fetch('http://localhost:8081/obtenerEquipos');
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.Estatus === 'Exitoso') {
        setTeams(data.contenido);
      } else {
        console.error('Error al obtener proyectos');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const fetchEstados = async () => {
    try {
      const response = await fetch('http://localhost:8081/obtenerEstados');
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.Estatus === 'Exitoso') {
        setEstados(data.contenido);
      } else {
        console.error('Error al obtener estados');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const openModal = (team) => {
    setSelectedTeam(team);
    setEditedTeam({ ...team });
  };

  const closeModal = () => {
    setSelectedTeam(null);
    setEditedTeam(null);
  };

  const openDetailsModal = (team) => {
    setSelectedTeam(team);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setSelectedTeam(null);
    setShowDetailsModal(false);
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`http://localhost:8081/editarEquipo/${editedTeam.id_equipo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          especialidad: editedTeam.especialidad_equipo,
          idProyecto: editedTeam.id_proyecto_id,
          idEstado: editedTeam.id_estado_id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.Estatus === 'Exitoso') {
        console.log('Equipo editado exitosamente');
        fetchTeams();
        closeModal();
      } else {
        console.error('Error en la respuesta del servidor:', data);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const handleDelete = async (equipoId) => {
    // Mostrar cuadro de diálogo de confirmación
    const userConfirmed = window.confirm('¿Estás seguro de eliminar este equipo?');

    if (userConfirmed) {
      try {
        const response = await fetch(`http://localhost:8081/eliminarEquipo/${equipoId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.Estatus === 'Exitoso') {
          // Mostrar alerta de éxito después de la eliminación exitosa
          setShowSuccessAlert(true);
          console.log('Equipo eliminado exitosamente');
          fetchTeams();
        } else {
          console.error('Error en la respuesta del servidor:', data);
        }
      } catch (error) {
        console.error('Error de red:', error);
      } finally {
        // Cerrar la alerta de éxito después de un tiempo (puedes ajustar el tiempo)
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 3000);
      }
    }
  };

  useEffect(() => {
    fetchTeams();
    fetchEstados();
  }, []);

  return (
    <>
      <SideBarUser />
      <HeaderUser />
      <div className="container-home-user">
        <br />
        <div>
          <p>---- Equipos ----</p>
          <div className='alert-absolute'>
            {/* Alerta de confirmación de eliminación */}
            {showDeleteAlert && (
              <Alert severity="warning">
                <AlertTitle>Warning</AlertTitle>
                Estás seguro de eliminar este equipo? — <strong>Por favor, confirma.</strong>
                <br />
                <button onClick={() => handleDelete(selectedTeam.id_equipo)}>Confirmar</button>
                <button onClick={() => setShowDeleteAlert(false)}>Cancelar</button>
              </Alert>
            )}
            {/* Alerta de éxito después de la eliminación */}
            {showSuccessAlert && (
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                Equipo eliminado exitosamente — <strong>Listo!</strong>
              </Alert>
            )}
          </div>
        </div>
        <div className="project-view-container">
          {teams.map((team, index) => (
            <div className="view-project" key={index}>
              <div className='view-project-decoration'>
                <br />
                <p>{team.nombre_equipo}</p>
                <br />
                <p>{team.nombre_proyecto}</p>
                <br />
                <p>Estado: {team.nombre_estado}</p>
                <br />
                <button className='button-details-teams' onClick={() => openDetailsModal(team)}>
                  Ver equipo
                </button>
                <br />
                <div className="icon-create-project">
                  <MdEditDocument onClick={() => openModal(team)} className="edit-icon" />
                  <MdDeleteForever
                    className="delete-icon"
                    onClick={() => handleDelete(team.id_equipo)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <Modal
          isOpen={showDetailsModal}
          onRequestClose={closeDetailsModal}
          contentLabel="Detalles del Equipo"
          className="Modal-information"
          overlayClassName="Overlay"
        >
          {selectedTeam && (
            <>
              <h2>{selectedTeam.nombre_equipo}</h2>
              <p>{selectedTeam.especialidad_equipo}</p>
              <p>{selectedTeam.nombre_proyecto}</p>
              <p>Estado: {selectedTeam.nombre_estado}</p>
              <button onClick={closeDetailsModal}>Cerrar</button>
            </>
          )}
        </Modal>
        <Modal
          isOpen={editedTeam !== null}
          onRequestClose={closeModal}
          contentLabel="Editar Equipo"
          className="Modal-update"
          overlayClassName="Overlay"
        >
          {editedTeam && (
            <>
              <h2>Editar Equipo</h2>
              <label>Especialidad:</label>
              <input
                type="text"
                value={editedTeam.especialidad_equipo}
                onChange={(e) =>
                  setEditedTeam({ ...editedTeam, especialidad_equipo: e.target.value })
                }
              />
              <br />
              <label>Proyecto:</label>
              <input
                type="text"
                value={editedTeam.nombre_proyecto}
                onChange={(e) =>
                  setEditedTeam({ ...editedTeam, nombre_proyecto: e.target.value })
                }
              />
              <br />
              <label>Estado:</label>
              <select
                value={editedTeam.id_estado_id}
                onChange={(e) =>
                  setEditedTeam({ ...editedTeam, id_estado_id: e.target.value })
                }
              >
                {estados.map((estado) => (
                  <option key={estado.id_estado} value={estado.id_estado}>
                    {estado.nombre_estado}
                  </option>
                ))}
              </select>
              <br />
              <button onClick={handleEdit}>Guardar cambios</button>
              <button onClick={closeModal}>Cancelar</button>
            </>
          )}
        </Modal>
      </div>
    </>
  );
};

export default HomeUser;
