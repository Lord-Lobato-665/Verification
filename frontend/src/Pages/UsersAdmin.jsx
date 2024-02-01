import "../styles/ResourcesTable.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import SideBarAdmin from "../components/SideBarAdmin";
import HeaderAdmin from "../components/HeaderAdmin";

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
  }, []);
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
            <Link to="/resources/add" className="btn-add-resource">
              Agregar
            </Link>
          </div>
          <div className="cont-table-resource">
            <div className="margin-table-resources">
              <table className="item-table-resource">
                <tr className="row-one">
                  <th className="head-table-resource">Nombre del Usuario</th>
                  <th className="head-table-resource">Correo del Usuario</th>
                  <th className="head-table-resource">Editar</th>
                  <th className="head-table-resource">Eliminar</th>
                </tr>

                {users.map((user) => (
                  <tr key={user.id_usuario}>
                    <td className="body-table-resource">
                      {user.nombre_usuario}
                    </td>
                    <td className="body-table-resource">
                      {user.correo_usuario}
                    </td>
                    <td className="body-table-resource">
                      <Link
                        className="edit-trash-resource"
                        to={`/users/edit/${user.id_usuario}`}
                      >
                        <FaPencilAlt />
                      </Link>
                    </td>
                    <td className="body-table-resource">
                      <FaTrashAlt />
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
