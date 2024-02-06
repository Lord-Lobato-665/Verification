import "../styles/AddProjectAdmin.css";
import SideBarAdmin from "./SideBarAdmin";
import HeaderAdmin from "./HeaderAdmin";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddProjectAdmin = () => {
  const [Usuarios, setUsuarios] = useState([]);
  const [proyecto, setProyecto] = useState({
    nombre_proyecto: "",
    descripcion_proyecto: "",
    id_usuario_id: "",
    id_estado_id: "",
  });
  const navegacion = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProyecto((prevProyecto) => ({
      ...prevProyecto,
      [name]: value,
    }));
  };
  useEffect(() => {
    const mostrarUsuarios = async () => {
      try {
        await axios
          .get("http://localhost:8081/obtenerUsuariosDignos")
          .then((res) => {
            if (res.data.Estatus == "Exitoso") {
              setUsuarios(res.data.contenido);
            }
          });
      } catch (error) {
        console.log(error);
      }
    };
    mostrarUsuarios();
  }, []);
  async function crearProyecto(e) {
    e.preventDefault();
    const usuarioselec = Usuarios.find(
      (e) => e.nombre_usuario == proyecto.id_usuario_id
    );
    const { id_usuario } = usuarioselec;

    proyecto.id_usuario_id = id_usuario;

    switch (proyecto.id_estado_id) {
      case "Iniciado":
        proyecto.id_estado_id = 3;
        break;
      case "En proceso":
        proyecto.id_estado_id = 4;
        break;
      case "Finalizado":
        proyecto.id_estado_id = 5;
        break;
      default:
        console.log("fallo en el estado");
    }
    const nuevoPro = { ...proyecto };
    publicarProyecto(nuevoPro);
  }

  async function publicarProyecto(proy) {
    console.log(proy);
    await axios
      .post("http://localhost:8081/crearProyecto", proy)
      .then((res) => {
        if (res.data.Estatus === "Exitoso") {
          navegacion("/projects");
        }
      });
  }

  console.log(proyecto);

  return (
    <>
      <SideBarAdmin />
      <div className="box-add-project">
        <h2>Crear Nuevo Proyecto</h2>
        <form onSubmit={crearProyecto} className="form-add-project">
          <div className="form-group">
            <label htmlFor="nombre_proyecto">Nombre del Proyecto:</label>
            <input
              type="text"
              id="nombre_proyecto"
              placeholder="Ingresa un nombre"
              name="nombre_proyecto"
              value={proyecto.nombre_proyecto}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="descripcion_proyecto">Descripción del Proyecto:</label>
            <input
              type="text"
              id="descripcion_proyecto"
              placeholder="Ingresa una descripción"
              name="descripcion_proyecto"
              value={proyecto.descripcion_proyecto}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="id_usuario_id">Líder del Proyecto:</label>
            <select
              id="id_usuario_id"
              value={proyecto.id_usuario_id}
              onChange={handleChange}
              name="id_usuario_id"
              required
            >
              <option value="">Seleccione un Líder</option>
              {Usuarios.map((usuario) => (
                <option key={usuario.id_usuario} value={usuario.id_usuario}>
                  {usuario.nombre_usuario}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="id_estado_id">Estado del Proyecto:</label>
            <select
              id="id_estado_id"
              value={proyecto.id_estado_id}
              onChange={handleChange}
              name="id_estado_id"
              required
            >
              <option value="">Seleccione un Estado</option>
              <option value="Iniciado">Iniciado</option>
              <option value="En proceso">En proceso</option>
              <option value="Finalizado">Finalizado</option>
            </select>
          </div>
          <button type="submit" className="btn-create-project">Crear</button>
        </form>
      </div>
    </>
  );
};

export default AddProjectAdmin;
