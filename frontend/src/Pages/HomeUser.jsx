import { useState, useEffect } from "react";
import SideBarUser from "../components/SideBarUser";
import HeaderUser from "../components/HeaderUser";
import "../styles/HomeUser.css";
import { MdDeleteForever, MdEditDocument } from "react-icons/md";
import Modal from "react-modal";
import { Alert, AlertTitle } from "@mui/material"; // Importa los componentes de Material-UI Alert
import { jwtDecode } from "jwt-decode";
import axios from "axios";

Modal.setAppElement("#root");

const HomeUser = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [editedTeam, setEditedTeam] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [proyectos, setProyectos] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const [statetarea, setStateTarea] = useState(false);
  const [miembrotarea, setMiembroTarea] = useState([]);
  const [idmiembro, setIdmiembro] = useState([]);
  const [infaddmem, setInfAddMen] = useState({
    id_usuario: "",
    id_equipo: "",
    id_rol: "",
  });
  const [users, setUsers] = useState([]);
  const [fintarea, setFinTarea] = useState({
    nombre_tarea: "",
    descripcion_tarea: "",
    id_miembro: "",
  });

  const enviarTarea = async () => {
    fintarea.id_miembro = idmiembro;
    console.log(fintarea);
    if (fintarea.nombre_tarea != "" && fintarea.descripcion_tarea != ""){
      await axios
        .post("http://localhost:8081/addTarea", fintarea)
        .then((res) => {
          if (res.data.Estatus === "Exitoso") {
            setStateTarea(!statetarea);
          }
        });

    }
  };

  const cerrarTarea = () => {
    setMiembroTarea([]);
    setIdmiembro([]);
    setStateTarea(!statetarea);
  };
  const abrirTarea = (miembro) => {
    setMiembroTarea(miembro.nombre_usuario);
    setIdmiembro(miembro.id_miembro);
    setStateTarea(!statetarea);
  };

  const obtenerUsuarios = async () => {
    const response = await fetch("http://localhost:8081/obtenerUsuariosDignos");
    const data = await response.json();
    if (data.Estatus === "Exitoso") {
      setUsers(data.contenido);
    }
  };

  const añadirMiembro = async () => {
    obtenerUsuarios();
  };
  const enviarMiembro = async () => {
    if (infaddmem.id_usuario != "" && infaddmem.id_rol != "") {
      const objusua = users.find((e) => {
        return e.nombre_usuario === infaddmem.id_usuario;
      });
      infaddmem.id_usuario = objusua.id_usuario;
      const { id_equipo } = selectedTeam;
      infaddmem.id_equipo = id_equipo;
      switch (infaddmem.id_rol) {
        case "Miembro común":
          infaddmem.id_rol = 1;
          break;
        case "Miembro líder":
          infaddmem.id_rol = 2;
          break;
      }

      await axios
        .post("http://localhost:8081/addMiembro", infaddmem)
        .then((res) => {
          if (res.data.Estatus === "Exitoso") {
            closemod();
            openDetailsModal(selectedTeam);
          }
        });
    } else {
      window.alert("Completa los campos para crear un nuevo miembro");
    }
  };

  useEffect(() => {
    const fetchUsuario = async () => {
      const token = localStorage.getItem("token"); //obtener el token
      const decoded = jwtDecode(token);
      const id = decoded.id;
      try {
        const response = await fetch(
          `http://localhost:8081/mostrarUsuario/${id}`
        );
        const data = await response.json();
        setUsuario(data.contenido);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsuario();
  }, [usuario]);
  useEffect(() => {
    const fetchProyecto = async () => {
      const token = localStorage.getItem("token"); //obtener el token
      const decoded = jwtDecode(token);
      const id = decoded.id;
      try {
        const response = await fetch(
          `http://localhost:8081/obtenerProyectoLider/${id}`
        );
        const data = await response.json();
        setProyectos(data.contenido);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProyecto();
  }, [proyectos]);
  useEffect(() => {
    const fetchTeams = async () => {
      const token = localStorage.getItem("token"); //obtener el token
      const decoded = jwtDecode(token);
      const id = decoded.id;

      try {
        const response = await fetch(
          `http://localhost:8081/obtenerEquiposLider/${id}`
        );
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.Estatus === "Exitoso") {
          setTeams(data.contenido);
        } else {
          console.error("Error al obtener Equipos");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };
    fetchTeams();
  }, [teams]);

  const openModal = (team) => {
    setSelectedTeam(team);
    setEditedTeam({ ...team });
  };

  const closeModal = () => {
    setSelectedTeam(null);
    setEditedTeam(null);
  };
  const closemod = () => {
    setUsers([]);
  };

  const openDetailsModal = async (team) => {
    const idEquipo = team.id_equipo;
    try {
      const response = await fetch(
        `http://localhost:8081/obtenerMiembrosPorEquipo/${idEquipo}`
      );
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      if (data.Estatus === "Exitoso") {
        setSelectedTeam({ ...team, miembros: data.contenido });
        setShowDetailsModal(true);
      } else {
        console.error("Error al obtener miembros del equipo");
        // Muestra una alerta de error en caso de fallo
      }
    } catch (error) {
      console.error("Error de red:", error);
      // Muestra una alerta de error en caso de fallo
    }
  };

  const closeDetailsModal = () => {
    setSelectedTeam(null);
    setShowDetailsModal(false);
  };

  const handleEdit = async () => {
    switch (editedTeam.nombre_estado) {
      case "Vacío":
        editedTeam.nombre_estado = 6;
        break;
      case "Disponible":
        editedTeam.nombre_estado = 7;
        break;
      case "Completado":
        editedTeam.nombre_estado = 8;
        break;
    }
    try {
      const response = await fetch(
        `http://localhost:8081/actualizarEquipo/${editedTeam.id_equipo}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombreEquipo: editedTeam.nombre_equipo,
            especialidad: editedTeam.especialidad_equipo,
            idEstado: editedTeam.nombre_estado,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.Estatus === "Exitoso") {
        console.log("Equipo editado exitosamente");

        // Actualiza el estado después de la edición exitosa

        closeModal();
      } else {
        console.error("Error en la respuesta del servidor:", data);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const handleDeleteMiembro = async (id) => {
    if (window.confirm("¿Estas seguro que quieres eliminar este miembro?")) {
      try {
        const response = await fetch(
          `http://localhost:8081/eliminarMiembro/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.Estatus === "Exitoso") {
          // Mostrar alerta de éxito después de la eliminación exitosa
          setShowSuccessAlert(true);
          console.log("Miembro eliminado exitosamente");
          // Vuelve a cargar los miembros después de la eliminación
          openDetailsModal(selectedTeam);
        } else {
          console.error("Error en la respuesta del servidor:", data);
        }
      } catch (error) {
        console.error("Error de red:", error);
      } finally {
        // Cerrar la alerta de éxito después de un tiempo (puedes ajustar el tiempo)
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 3000);
        // Restablecer el estado memberToDelete
      }
    }
  };

  const handleDelete = async (equipoId) => {
    // Mostrar cuadro de diálogo de confirmación
    const userConfirmed = window.confirm(
      "¿Estás seguro de eliminar este equipo?"
    );

    if (userConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:8081/eliminarEquipo/${equipoId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.Estatus === "Exitoso") {
          // Mostrar alerta de éxito después de la eliminación exitosa
          setShowSuccessAlert(true);
          console.log("Equipo eliminado exitosamente");
        } else {
          console.error("Error en la respuesta del servidor:", data);
        }
      } catch (error) {
        console.error("Error de red:", error);
      } finally {
        // Cerrar la alerta de éxito después de un tiempo (puedes ajustar el tiempo)
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 3000);
      }
    }
  };

  return (
    <>
      <SideBarUser />
      <HeaderUser />
      <div className="container-home-user">
        <br />
        <div>
          {usuario &&
            usuario.map((e, index) => (
              <div key={index}>
                <h1>Bienvenido {e.nombre_usuario}</h1>
              </div>
            ))}
          {proyectos &&
            proyectos.map((e) => (
              <div key={e.id_proyecto}>
                <h2>
                  Proyecto al que perteneces{" "}
                  <strong>{e.nombre_proyecto}</strong>
                </h2>
              </div>
            ))}
          <p>---- Equipos ----</p>
          <div className="alert-absolute">
            {/* Alerta de confirmación de eliminación */}
            {showDeleteAlert && (
              <Alert severity="warning">
                <AlertTitle>Warning</AlertTitle>
                Estás seguro de eliminar este equipo? —{" "}
                <strong>Por favor, confirma.</strong>
                <br />
                <button onClick={() => handleDelete(selectedTeam.id_equipo)}>
                  Confirmar
                </button>
                <button onClick={() => setShowDeleteAlert(false)}>
                  Cancelar
                </button>
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
              <div className="view-project-decoration">
                <br />
                <p>{team.nombre_proyecto}</p>
                <br />
                <p>{team.nombre_equipo}</p>
                <br />
                <p>Estado: {team.nombre_estado}</p>
                <br />
                <button
                  className="button-details-teams"
                  onClick={() => openDetailsModal(team)}
                >
                  Ver equipo
                </button>
                <br />
                <div className="icon-create-project">
                  <MdEditDocument
                    onClick={() => openModal(team)}
                    className="edit-icon"
                  />
                  <MdDeleteForever
                    className="delete-icon"
                    onClick={() => handleDelete(team.id_equipo)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Modal que muestra equipo con miembros */}
        <Modal
          isOpen={showDetailsModal}
          onRequestClose={closeDetailsModal}
          contentLabel="Detalles del Equipo"
          className="Modal-information"
          overlayClassName="Overlay"
        >
          {selectedTeam && (
            <div className="modal-content">
              <div className="ab">
                <h4>Equipo:{selectedTeam.nombre_equipo}</h4>
                <p>Especialidad: {selectedTeam.especialidad_equipo}</p>
                <p>Estado: {selectedTeam.nombre_estado}</p>
                <br />
                <br />
                <h4>Miembros del Equipo:</h4>
              </div>
              <div className="modal-details">
                {selectedTeam.miembros &&
                  selectedTeam.miembros.map((miembro) => (
                    <div className="member-card" key={miembro.id_miembro}>
                      <h4>{miembro.nombre_usuario}</h4>
                      <p>Rol: {miembro.nombre_rol_equipo}</p>
                      <button
                        className="delete-member"
                        onClick={() => handleDeleteMiembro(miembro.id_miembro)}
                      >
                        ELIMINAR
                      </button>
                      <button
                        style={{ margin: 5, padding: 2 }}
                        className="delete-member"
                        onClick={() => {
                          abrirTarea(miembro);
                        }}
                      >
                        Añadir Tarea
                      </button>
                    </div>
                  ))}
              </div>
              <button className="modal-button" onClick={closeDetailsModal}>
                Cerrar
              </button>
              <button
                className="modal-button"
                style={{ margin: 10 }}
                onClick={añadirMiembro}
              >
                AÑADIR MIEMBRO
              </button>
            </div>
          )}
        </Modal>
        {/* modal para editar equipo */}
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
              <label>Nombre Equipo:</label>
              <input
                type="text"
                value={editedTeam.nombre_equipo}
                onChange={(e) =>
                  setEditedTeam({
                    ...editedTeam,
                    nombre_equipo: e.target.value,
                  })
                }
              />
              <label>Especialidad:</label>
              <input
                type="text"
                value={editedTeam.especialidad_equipo}
                onChange={(e) =>
                  setEditedTeam({
                    ...editedTeam,
                    especialidad_equipo: e.target.value,
                  })
                }
              />
              <br />
              <label>Estado:</label>
              <select
                value={editedTeam.nombre_estado}
                onChange={(e) =>
                  setEditedTeam({
                    ...editedTeam,
                    nombre_estado: e.target.value,
                  })
                }
              >
                <option value="">seleccione un estado</option>
                <option value="Vacío">Vacío</option>
                <option value="Disponible">Disponible</option>
                <option value="Completado">Completado</option>
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

        {/* modal para agregar tarea al miembro */}
        <Modal
          isOpen={statetarea}
          onRequestClose={closeModal}
          contentLabel="Editar Equipo"
          className="Modal-update"
          overlayClassName="Overlay"
        >
          <div className="modal-content">
            <h2>Agregar Tarea</h2>
            <br />
            <div>
              <h3>
                Nombre del Miembro <strong>{miembrotarea}</strong>
              </h3>
              <label htmlFor="">
                Nombre Tarea
                <input
                  type="text"
                  label="Ingresa un titulo de la tarea"
                  onChange={(e) => {
                    setFinTarea({
                      ...fintarea,
                      nombre_tarea: e.target.value,
                    });
                  }}
                />
              </label>
              <label htmlFor="">
                Descripción de la Tarea
                <input
                  type="text"
                  label="Ingresa una descripción"
                  onChange={(e) => {
                    setFinTarea({
                      ...fintarea,
                      descripcion_tarea: e.target.value,
                    });
                  }}
                />
              </label>
            </div>
            <br />
            <button className="modal-update-button" onClick={enviarTarea}>
              Añadir Tarea
            </button>
            <button className="modal-cancel-button" onClick={cerrarTarea}>
              Cerrar
            </button>
          </div>
        </Modal>
        {/* modal para crear un miembro */}
        <Modal
          isOpen={users.length >= 1}
          onRequestClose={closeModal}
          contentLabel="Editar Equipo"
          className="Modal-update"
          overlayClassName="Overlay"
        >
          <div className="modal-content">
            <h2>Agregar Miembro</h2>
            <br />
            <label>Elije al Miembro:</label>
            <select
              required="true"
              value={infaddmem.id_usuario}
              onChange={(e) => {
                setInfAddMen({
                  ...infaddmem,
                  id_usuario: e.target.value,
                });
              }}
            >
              <option value="">selecciona un Miembro</option>
              {users.map((user) => (
                <option key={user.id_usuario} value={user.nombre_usuario}>
                  {user.nombre_usuario}
                </option>
              ))}
            </select>

            <br />
            <label>Rol en el Equipo:</label>
            <select
              required="true"
              value={infaddmem.id_rol}
              onChange={(e) => {
                setInfAddMen({
                  ...infaddmem,
                  id_rol: e.target.value,
                });
              }}
            >
              <option value="">seleccione un rol</option>
              <option value="Miembro común">Miembro común</option>
              <option value="Miembro líder">Miembro líder</option>
            </select>
            <br />
            <button className="modal-update-button" onClick={enviarMiembro}>
              Añadir Miembro
            </button>
            <button className="modal-cancel-button" onClick={closemod}>
              Cancelar
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default HomeUser;
