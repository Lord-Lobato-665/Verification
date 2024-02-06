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

    proyecto.id_usuario_id=id_usuario;

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
      <HeaderAdmin />
      <SideBarAdmin />
      <div className="box-add-project">
        <h2>Crear Nuevo Proyecto</h2>
        <form onSubmit={crearProyecto}>
          <div className="label-name-project-admin">
            <label htmlFor="">
              Nombre del Proyecto
              <br />
              <input
                type="text"
                placeholder="Ingresa un nombre"
                name="nombre_proyecto"
                onChange={handleChange}
                value={proyecto.nombre_proyecto}
                required="true"
              />
            </label>
          </div>
          <div className="label-name-project-admin">
            <label htmlFor="">
              Descripción del Proyecto
              <br />
              <input
                type="text"
                placeholder="Ingresa una descripción"
                name="descripcion_proyecto"
                onChange={handleChange}
                value={proyecto.descripcion_proyecto}
                required="true"
              />
            </label>
          </div>
          <div className="label-name-project-admin">
            <label htmlFor="">
              Lider del Proyecto
              <br />
              <select
                value={proyecto.nombre_usuario}
                onChange={handleChange}
                name="id_usuario_id"
                required="true"
              >
                <option value="">Seleccione un Lider</option>
                {Usuarios.map((usuario) => (
                  <option
                    key={usuario.id_usuario}
                    value={usuario.nombre_usuario}
                  >
                    {usuario.nombre_usuario}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="label-name-project-admin">
            <label htmlFor="">
              Estado del Proyecto
              <br />
              <select
                value={proyecto.id_estado_id}
                onChange={handleChange}
                name="id_estado_id"
                required="true"
              >
                <option value="">Selecione un Estado</option>
                <option value="Iniciado">Iniciado</option>
                <option value="En proceso">En proceso</option>
                <option value="Finalizado">Finalizado</option>
              </select>
            </label>
          </div>
          <button type="submit" className="btn-add-resource">
            Crear
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProjectAdmin;
