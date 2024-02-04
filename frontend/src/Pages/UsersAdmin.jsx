import "../styles/ResourcesTable.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import SideBarAdmin from "../components/SideBarAdmin";
import HeaderAdmin from "../components/HeaderAdmin";
import axios from "axios";

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const atraerRecursos = async () => {
      try {
        const response = await fetch("http://localhost:8081/mostrarUsuarios");
        const data = await response.json();
        setUsers(data.contenido);
      } catch (error) {
        console.log(error);
      }
    };
    atraerRecursos();
  }, [users]);

  function eliminarUsuario(id) {
    if (window.confirm("¿Seguro que quieres eliminar este Usuario?")) {
      const token = localStorage.getItem("token"); //obtener el token
      axios
        .delete(`http://localhost:8081/eliminarUsuario/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Agrega el token al header de la solicitud
          },
        })
        .then((respuesta) => {
          if (respuesta.data.Estatus === "Exitoso") {
            console.log("si");
          }
        });
    }
  }
  return (
    <>
      <HeaderAdmin />
      <SideBarAdmin />
      <div className="resource-table">
        <div className="box-resource">
          <h2 className="title-resource">Usuarios</h2>
          <div className="search-resource">
            <div className="border-search-resource">
              <input
                type="search"
                placeholder="Buscar Usuario"
                className="input-resource"
              />
              <FaSearch size={20} />
            </div>
            <Link to="/users/add" className="btn-add-resource">
              Nuevo
            </Link>
          </div>
          <div className="cont-table-resource">
            <div className="cont-table-resource">
              <table className="content-table">
                <tr className="row-one">
                  <th className="">Nombre del Usuario</th>
                  <th className="">Correo del Usuario</th>
                  <th className="">Editar</th>
                  <th className="">Eliminar</th>
                </tr>

                {users.map((user) => (
                  <tr key={user.id_usuario} className="td-request-admin">
                    <td className="">{user.nombre_usuario}</td>
                    <td className="">{user.correo_usuario}</td>
                    <td className="">
                      <Link
                        className="edit-trash-resource"
                        to={`/users/edit/${user.id_usuario}`}
                      >
                        <FaPencilAlt />
                      </Link>
                    </td>
                    <td className="">
                      <FaTrashAlt
                        onClick={() => eliminarUsuario(user.id_usuario)}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersAdmin;
