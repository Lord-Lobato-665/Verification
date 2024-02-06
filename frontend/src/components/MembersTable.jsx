import "../styles/MembersTable.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";

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

const MembersTable = () => {
  const [miembros, setMiembros] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [unmiembro, setUnMiembro] = useState([]);
  const [cambio, setCambio] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUnMiembro((prevProyecto) => ({
      ...prevProyecto,
      [name]: value,
    }));
  };

  function closeModal() {
    setIsOpen(false);
    setUnMiembro(null); // Limpiar el proyecto seleccionado al cerrar el modal
  }

  useEffect(() => {
    const obtenerMiembros = async () => {
      const response = await fetch("http://localhost:8081/mostrarMiembros");
      const data = await response.json();
      setMiembros(data.contenido);
    };
    obtenerMiembros();
  }, [miembros]);

  async function eliminarMiembro(id) {
    if (window.confirm("¿Seguro que quieres eliminar este Miembro?")) {
      axios
        .delete(`http://localhost:8081/eliminarMiembro/${id}`)
        .then((respuesta) => {
          if (respuesta.data.Estatus === "Exitoso") {
            console.log("si");
          }
        });
    }
  }
  async function actualizarMiembro(id) {
    await axios
      .get(`http://localhost:8081/mostrarMiembro/${id}`)
      .then((response) => {
        if (response.data.Estatus == "Exitoso") {
          console.log(response.data);
          console.log(response.data.contenido);
          setUnMiembro(response.data.contenido[0]);
          openModal();
          console.log(unmiembro);
        }
      });
  }
  async function enviarMiembro(e) {
    e.preventDefault();
    if (unmiembro && unmiembro.id_miembro && unmiembro.nombre_usuario) {
      const response = await axios.post(
        `http://localhost:8081/actualizarMiembro/${unmiembro.id_miembro}`,
        { nombre_usuario: unmiembro.nombre_usuario }
      );
      if (response.data.Estatus === "Exitoso") {
        console.log(unmiembro);
        setCambio(!cambio);
        closeModal();
      }
    }
  }

  return (
    <>
      <div className="resource-table">
        <div className="box-resource">
          <h2 className="tittle">Miembros</h2>
          <div className="search-resource">
          </div>
          <div className="cont-table-resource">
            <div className="">
              <table className="content-table">
                <tr className="row-one">
                  <th className="head-table-resource">Nombre del miembro</th>
                  <th className="head-table-resource">Nombre del Equipo</th>
                  <th className="head-table-resource">Rol</th>
                  <th className="head-table-resource">Estado</th>
                  <th className="head-table-resource">Editar</th>
                  <th className="head-table-resource">Eliminar</th>
                </tr>
                {miembros.map((miembro) => (
                  <tr key={miembro.id_miembro} className="td-request-admin">
                    <td className="">{miembro.nombre_usuario}</td>
                    <td className="">{miembro.nombre_equipo}</td>
                    <td className="">{miembro.nombre_rol_equipo}</td>
                    <td className="">{miembro.nombre_estado}</td>
                    <td className="">
                      <Link
                        className="edit-trash-resource"
                        onClick={() => {
                          actualizarMiembro(miembro.id_miembro);
                        }}
                      >
                        <FaPencilAlt />
                      </Link>
                    </td>
                    <td className="">
                      <Link
                        className="edit-trash-resource"
                        onClick={() => {
                          eliminarMiembro(miembro.id_miembro);
                        }}
                      >
                        <FaTrashAlt />
                      </Link>
                    </td>
                  </tr>
                ))}
              </table>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Editar Miembro"
                style={customStyles}
              >
                {unmiembro && (
                  <form className="cont-modal-proyect" onSubmit={enviarMiembro}>
                    <div className="label-modal-proyect">
                      <label>
                        Nombre del Miembro
                        <input
                          type="text"
                          name="nombre_usuario"
                          value={unmiembro.nombre_usuario}
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                    <button
                      className="guardar-modal-proyect"
                      type="submit"
                      onClick={enviarMiembro}
                    >
                      Guardar
                    </button>
                    <button
                      onClick={closeModal}
                      className="cerrar-modal-proyect"
                    >
                      Cerrar
                    </button>
                  </form>
                )}
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MembersTable;
