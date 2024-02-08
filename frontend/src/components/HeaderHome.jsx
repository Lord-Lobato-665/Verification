import { Link } from "react-router-dom";
import "../styles/HeaderHome.css";
import LogoHeader from "../images/logodos.png";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Modal } from "@mui/material";

import axios from "axios";
/* 080417 */
const HeaderHome = () => {
  const navigate = useNavigate();
  const [tareas, setTareas] = useState([]);
  const [statetarea, setStateTarea] = useState(false);
  const [statepeticion, setStatePeticion] = useState(false);
  const [peticiones, setPeticiones] = useState(null);
  const [peticion, setPeticion] = useState({
    nombre_peticion: "",
    descripcion_peticion: "",
    id_miembro: "",
  });
  const [idmem, setIdMem] = useState([]);
  const marcarTarea = async (id) => {
    await axios.post(`http://localhost:8081/marcarTarea/${id}`).then((res) => {
      if (res.data.Estatus === "Exitoso") {
        window.alert("Tarea entregada Exitosamente");
      }
    });
  };

  const getTaskColor = (estado) => {
    switch (estado) {
      case "Asignada":
        return "#219ebc"; // Naranja para contraseña normal
      case "Completado":
        return "green"; //
      default:
        return "black"; // Negro por defecto
    }
  };
  const desmarcarTarea = async (id) => {
    await axios
      .post(`http://localhost:8081/marcarTareaPendiente/${id}`)
      .then((res) => {
        if (res.data.Estatus === "Exitoso") {
          window.alert("Tarea desmarcada Exitosamente");
        }
      });
  };

  const abrirPeticion = () => {
    setStatePeticion(!statepeticion);
  };

  const cerrarPeticion = () => {
    setStatePeticion(!statepeticion);
  };

  const abrirTarea = () => {
    setStateTarea(!statetarea);
  };
  const cerrarTarea = () => {
    setStateTarea(!statetarea);
  };
  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token de localStorage
    navigate("/login"); // Redirige al usuario a la página de inicio de sesión
  };

  useEffect(() => {
    const mostrarTareas = async () => {
      const token = localStorage.getItem("token"); //obtener el token
      const decoded = jwtDecode(token);
      const id = decoded.id;
      const response = await fetch(
        `http://localhost:8081/obtenerTareasMiembro/${id}`
      );
      const data = await response.json();
      if (data.Estatus === "Exitoso") {
        setTareas(data.contenido);
      } else {
        window.alert("fallo al buscar tareas");
      }
    };
    mostrarTareas();
  }, [tareas]);

  useEffect(() => {
    const mostrarPeticiones = async () => {
      const token = localStorage.getItem("token"); //obtener el token
      const decoded = jwtDecode(token);
      const id = decoded.id;
      const response = await fetch(
        `http://localhost:8081/obtenerAsignacion/${id}`
      );
      const data = await response.json();
      if (data.Estatus === "Exitoso") {
        const asig = data.contenido[0].asignacion;
        setPeticiones(asig);
        if (asig != null) {
          const res = await fetch(
            `http://localhost:8081/obtenerIdMember/${id}`
          );
          const dat = await res.json();
          setIdMem(dat.contenido[0].id_miembro);
        }
      } else {
        window.alert("fallo al buscar peticiones");
      }
    };
    mostrarPeticiones();
  }, [peticiones]);

  const enviarPeticion = async () => {
    peticion.id_miembro = idmem;
    await axios
      .post("http://localhost:8081/addPeticion", peticion)
      .then((res) => {
        if (res.data.Estatus === "Exitoso") {
          window.alert("Peticion enviada con Éxito");
          cerrarPeticion();
        }
      });
  };

  return (
    <>
      <header className="header-home">
        <ul className="nav-links">
          <Link to="/home">
            <img className="logo-header" src={LogoHeader} alt="Logo" />
          </Link>
          <li className="center">
            <Link to="/nosotros">Nosotros</Link>
          </li>
          <li className="center">
            <Link to="/mision">Misión y visión</Link>
          </li>
          {peticiones != null ? (
            <li className="center" onClick={abrirPeticion}>
              <span style={{ cursor: "pointer" }} className="span-home">
                <Link>Petición</Link>
              </span>
            </li>
          ) : null}

          {tareas.length >= 1 ? (
            <li className="center" onClick={abrirTarea}>
              <span style={{ cursor: "pointer" }} className="span-home">
                <Link>Tareas</Link>
              </span>
            </li>
          ) : null}
          <Link onClick={handleLogout} className="yeye">
            <span>Salir</span>
            <BiLogOut className="" />
          </Link>
        </ul>
        {/* modal para ver tarea */}
        <Modal
          open={statetarea}
          onClose={cerrarTarea} // Agrega manejo para el cierre del modal
          contentLabel="Editar Equipo"
        >
          <div
            className=""
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: 20,
              borderRadius: 8,
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              // Asegúrate de limitar el ancho y el alto si es necesario
              Width: "700px",
              maxHeight: "100%",
              overflow: "auto", // Añade scroll si el contenido es muy largo
            }}
          >
            <div className="box-tar-user">
              {tareas.map((e) => (
                <div key={e.id_tarea} className="cart-tar-user">
                  <div
                    className="header-tarea"
                    style={{ background: getTaskColor(e.nombre_estado) }}
                  >
                    Tarea
                  </div>
                  <div className="name-tar-user">
                    <span className="span-name">Nombre de la tarea:</span>
                    <p>{e.nombre_tarea}</p>
                  </div>
                  <div className="name-tar-user">
                    <span className="span-name">Descripción de la Tarea:</span>
                    <p>{e.descripcion_tarea}</p>
                  </div>
                  <div className="name-tar-user">
                    <span className="span-name">Estado de la Tarea:</span>
                    <p>{e.nombre_estado}</p>
                  </div>
                  <div className="name-tar-user">
                    <span className="span-name">Marcar completado:</span>
                    <br />
                    <button
                      className="finish-task "
                      onClick={() => {
                        marcarTarea(e.id_tarea);
                      }}
                    >
                      Marcar
                    </button>
                    <button
                      style={{ margin: 10 }}
                      className="finish-task "
                      onClick={() => {
                        desmarcarTarea(e.id_tarea);
                      }}
                    >
                      Desmarcar
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="modal-cancel-task-button" onClick={cerrarTarea}>
              Cerrar
            </button>
          </div>
        </Modal>
        {/* modal para agregar peticion */}

        <Modal
          open={statepeticion}
          onClose={cerrarPeticion} // Agrega manejo para el cierre del modal
          contentLabel="Editar Equipo"
        >
          <div
            className=""
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#023047",
              padding: 20,
              borderRadius: 8,
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              maxWidth: "240px",
              maxHeight: "100%",
              overflow: "auto", // Añade scroll si el contenido es muy largo
              border: "2px solid white",
              justifyContent: "center",
              color: "white",
            }}
          >
            <div className="box-pet-user">
              <div>
                <h4>Crear Petición</h4>
                <label htmlFor="">Nombre de la Peticion</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setPeticion({
                      ...peticion,
                      nombre_peticion: e.target.value,
                    });
                  }}
                />
                <label htmlFor="">Descripción de la petición</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setPeticion({
                      ...peticion,
                      descripcion_peticion: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <button onClick={enviarPeticion} className="modal-acept-button">
              Enviar Peticion
            </button>
            <button className="modal-cancel-button" onClick={cerrarPeticion}>
              Cerrar
            </button>
          </div>
        </Modal>
      </header>
    </>
  );
};

export default HeaderHome;
