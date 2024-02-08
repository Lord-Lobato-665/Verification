import SideBarAdmin from "./SideBarAdmin";
import HeaderAdmin from "./HeaderAdmin";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const EditAdmin = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    nombre_usuario: "",
    correo_usuario: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const actualizarUsuario = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    try {
      axios
        .put(`http://localhost:8081/actualizarUsuario/${id}`, user)
        .then((respuesta) => {
          if (respuesta.data.Estatus === "Exitoso") {
            navigate("/users");
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      alert("Error al actualizar el usuario");
    }
  };

  useEffect(() => {
    const mostrarUsuario = async () => {
      const response = await fetch(
        `http://localhost:8081/mostrarUsuario/${id}`
      );
      const data = await response.json();
      console.log(data);
      const cont = data.contenido;
      console.log(cont);
      setUser({
        nombre_usuario: cont[0].nombre_usuario,
        correo_usuario: cont[0].correo_usuario,
      });
    };
    mostrarUsuario();
  }, [id]);
  return (
    <>
      <HeaderAdmin />
      <SideBarAdmin />
      <div className="box-create-user">
        <h2 className="title-edit-resource">Edita el Usuario</h2>
        <form onSubmit={actualizarUsuario}>
          <div className="box-edit-resource">
            <div className="center-add-resource">
              <label className="label-name-resource">
                Nombre del Usuario
                <input
                  type="text"
                  name="nombre_usuario"
                  value={user.nombre_usuario}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className="center-add-resource">
              <label className="label-name-resource">
                Correo Electronico
                <input
                  type="email"
                  name="correo_usuario"
                  value={user.correo_usuario}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
          </div>
          <div className="cont-btn-act">
            <button type="submit" className="btn-act-resource">
              Actualizar Usuario
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditAdmin;
