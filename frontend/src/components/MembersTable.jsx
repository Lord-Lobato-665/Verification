import "../styles/MembersTable.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
const MembersTable = () => {
  const [miembros, setMiembros] = useState([]);

  useEffect(() => {
    const obtenerMiembros = async () => {
        const response = await fetch("http://localhost:8081/mostrarMiembros");
        const data = await response.json();
        setMiembros(data.contenido);
    };
    obtenerMiembros();
    console.log(miembros);
  }, [miembros]);

  return (
    <>
      <div className="resource-table">
        <div className="box-resource">
          <h2 className="title-resource">Miembros</h2>
          <div className="search-resource">
            <div className="border-search-resource">
              <input
                type="search"
                placeholder="Buscar miembro"
                className="input-resource"
              />
              <FaSearch size={20} />
            </div>
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
                        to="/resources/edit"
                      >
                        <FaPencilAlt />
                      </Link>
                    </td>
                    <td className="">
                      <Link
                        className="edit-trash-resource"
                        to="/resources/delete"
                      >
                        <FaTrashAlt />
                      </Link>
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

export default MembersTable;
