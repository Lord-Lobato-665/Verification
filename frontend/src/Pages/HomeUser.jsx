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
  const [memberToDelete, setMemberToDelete] = useState(null);

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

  const openDetailsModal = async (team) => {
    try {
      const response = await fetch(`http://localhost:8081/obtenerMiembrosPorEquipo/${team.id_equipo}`);
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      if (data.Estatus === 'Exitoso') {
        setSelectedTeam({ ...team, miembros: data.contenidoMiembros });
        setShowDetailsModal(true);
      } else {
        console.error('Error al obtener miembros del equipo');
        // Muestra una alerta de error en caso de fallo
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error('Error de red:', error);
      // Muestra una alerta de error en caso de fallo
      setShowErrorAlert(true);
    }
  };

  const closeDetailsModal = () => {
    setSelectedTeam(null);
    setShowDetailsModal(false);
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`http://localhost:8081/actualizarEquipo/${editedTeam.id_equipo}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          especialidad: editedTeam.especialidad_equipo,
          idEstado: editedTeam.id_estado_id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.Estatus === 'Exitoso') {
        console.log('Equipo editado exitosamente');

        // Actualiza el estado después de la edición exitosa
        fetchTeams();

        closeModal();
      } else {
        console.error('Error en la respuesta del servidor:', data);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const handleDeleteMiembro = async () => {
    try {
      const response = await fetch(`http://localhost:8081/eliminarMiembro/${memberToDelete}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.Estatus === 'Exitoso') {
        // Mostrar alerta de éxito después de la eliminación exitosa
        setShowSuccessAlert(true);
        console.log('Miembro eliminado exitosamente');
        // Vuelve a cargar los miembros después de la eliminación
        openDetailsModal(selectedTeam);
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
      // Restablecer el estado memberToDelete
      setMemberToDelete(null);
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
                <p>{team.nombre_proyecto}</p>
                <br />
                <p>{team.nombre_equipo}</p>
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
            <div className="modal-content">
              <h2>{selectedTeam.nombre_equipo}</h2>

              <div className='ab'>
                <p>Proyecto: {selectedTeam.nombre_proyecto}</p>
                <p>Especialidad: {selectedTeam.especialidad_equipo}</p>
                <p>Estado: {selectedTeam.nombre_estado}</p>
                <button className="modal-button" onClick={closeDetailsModal}>
                  Cerrar
                </button>
                <br />
                <br />
                <h3>Miembros del Equipo:</h3>
              </div>
              <div className="modal-details">
                {selectedTeam.miembros && selectedTeam.miembros.map((miembro) => (
                  <div className="member-card" key={miembro.id_miembro}>
                    <h4>{miembro.nombre_usuario}</h4>
                    <p>Rol: {miembro.nombre_rol_equipo}</p>
                    <button
                      className="delete-member"
                      onClick={() => setMemberToDelete(miembro.id_miembro)}
                    >
                      ELIMINAR
                    </button>
                  </div>
                ))}
              </div>
            </div>
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
            <div className="modal-content">
              <h2>Editar Equipo</h2>
              <br />
              <label>Especialidad:</label>
              <input
                type="text"
                value={editedTeam.especialidad_equipo}
                onChange={(e) =>
                  setEditedTeam({ ...editedTeam, especialidad_equipo: e.target.value })
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
              <button className="modal-update-button" onClick={handleEdit}>
                Guardar cambios
              </button>
              <button className="modal-cancel-button" onClick={closeModal}>
                Cancelar
              </button>
            </div>
          )}
        </Modal>

      </div>
    </>
  );
};

export default HomeUser;
