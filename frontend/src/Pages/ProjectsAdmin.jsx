import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import Modal from "react-modal";
import axios from "axios";
import SideBarAdmin from "../components/SideBarAdmin";
import HeaderAdmin from "../components/HeaderAdmin";
import "../styles/ProjectsAdmin.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "850px",
    height: "510px",
  },
};

const ProjectsAdmin = () => {
  const [proyectos, setProyectos] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [cambio, setCambio] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const mostrarProyectos = async () => {
      const response = await fetch("http://localhost:8081/mostrarProyectos");
      const data = await response.json();
      setProyectos(data.contenido);
    };
    mostrarProyectos();
  }, [cambio]);

  async function mostrarProyectoEspecifico(id) {
    const response = await fetch(`http://localhost:8081/mostrarProyecto/${id}`);
    const data = await response.json();
    if (data.contenido.length > 0) {
      setProyectoSeleccionado(data.contenido[0]);
      openModal();
    }
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setProyectoSeleccionado(null); // Limpiar el proyecto seleccionado al cerrar el modal
  }

  const actualizarProyecto = async (e) => {
    e.preventDefault();
    if (proyectoSeleccionado && proyectoSeleccionado.id_proyecto) {
      // Asignar un valor numérico al estado basado en el nombre_estado
      const mapeoEstado = {
        "Iniciado": 3,
        "En proceso": 4,
        "Finalizado": 5
      };
      const estadoNumerico = mapeoEstado[proyectoSeleccionado.nombre_estado] || proyectoSeleccionado.nombre_estado; // Por si acaso el estado no coincide
  
      const proyectoActualizado = {
        ...proyectoSeleccionado,
        nombre_estado: estadoNumerico, // Usar el valor numérico para el estado
      };
  
      try {
        await axios
          .put(`http://localhost:8081/actualizarProyecto/${proyectoSeleccionado.id_proyecto}`, proyectoActualizado)
          .then((respuesta) => {
            if (respuesta.data.Estatus === "Exitoso") {
              closeModal(); // Cerrar el modal
              navigate("/projects"); // Refrescar la página o redirigir según sea necesario
              setCambio(!cambio); // Forzar la recarga de los proyectos
            }
          });
      } catch (error) {
        console.error("Error al actualizar el proyecto:", error);
        alert("Error al actualizar el proyecto");
      }
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProyectoSeleccionado((prevProyecto) => ({
      ...prevProyecto,
      [name]: value,
    }));
  };

  return (
    <>
      <HeaderAdmin />
      <SideBarAdmin />
      <div className="resource-table">
        <div className="box-resource">
          <h2 className="title-resource">Proyectos</h2>
          <div className="search-resource">
            <div className="border-search-resource">
              <input
                type="search"
                placeholder="Buscar proyecto"
                className="input-resource"
              />
              <FaSearch size={20} />
            </div>
          </div>
          <div className="cont-table-resource">
            <table className="content-table">
              <thead>
                <tr className="row-one">
                  <th className="head-table-resource">Proyecto</th>
                  <th className="head-table-resource">Descripción</th>
                  <th className="head-table-resource">Fecha de Creación</th>
                  <th className="head-table-resource">Fecha de Finalización</th>
                  <th className="head-table-resource">Estado</th>
                  <th className="head-table-resource">Editar</th>
                  <th className="head-table-resource">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {proyectos.map((proyecto) => (
                  <tr key={proyecto.id_proyecto}>
                    <td>{proyecto.nombre_proyecto}</td>
                    <td>{proyecto.descripcion_proyecto}</td>
                    <td>{proyecto.fecha_creacion}</td>
                    <td>{proyecto.fecha_finalizacion}</td>
                    <td>{proyecto.nombre_estado}</td>
                    <td>
                      <button
                        className="edit-trash-resource"
                        onClick={() =>
                          mostrarProyectoEspecifico(proyecto.id_proyecto)
                        }
                      >
                        <FaPencilAlt />
                      </button>
                    </td>
                    <td>
                      <button className="edit-trash-resource">
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Editar Proyecto"
              style={customStyles}
            >
              {proyectoSeleccionado && (
                <form
                  className="cont-modal-proyect"
                  onSubmit={actualizarProyecto}
                >
                  <div className="label-modal-proyect">
                    <label>
                      Nombre del Proyecto
                      <input
                        type="text"
                        name="nombre_proyecto"
                        value={proyectoSeleccionado.nombre_proyecto}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className="label-modal-proyect">
                    <label>
                      Descripción del Proyecto
                      <input
                        type="text"
                        name="descripcion_proyecto"
                        value={proyectoSeleccionado.descripcion_proyecto}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className="label-modal-proyect">
                  <select name="nombre_estado" value={proyectoSeleccionado.nombre_estado} onChange={handleChange}>
  {/* Opción que refleja el estado actual del proyecto */}
  <option value={proyectoSeleccionado.nombre_estado}>{proyectoSeleccionado.nombre_estado}</option>

  {/* Otras opciones - asegúrate de que no se repita el valor actual de nombre_estado */}
  {["En proceso", "Finalizado","Iniciado"].map((estado) => {
    if (estado !== proyectoSeleccionado.nombre_estado) {
      return <option key={estado} value={estado}>{estado}</option>;
    }
    return null; // No renderizar una opción si ya es la actual
  })}
</select>

                  </div>
                  <button className="guardar-modal-proyect" type="submit">
                    Guardar
                  </button>
                  <button onClick={closeModal} className="cerrar-modal-proyect">
                    Cerrar
                  </button>
                </form>
              )}
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsAdmin;
