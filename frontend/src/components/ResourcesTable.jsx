import "../styles/ResourcesTable.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

const ResourcesTable = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const cargarRecursos = async () => {
      try {
        const response = await fetch("http://localhost:8081/obtenerRecursos");
        const data = await response.json();
        if (data.Estatus === "Exitoso") {
          setResources(data.contenido);
          console.log(data.contenido);
        } else {
          console.log("La respuesta no fue exitosa.");
        }
      } catch (error) {
        console.log(error);
      }
    };
    cargarRecursos();
  }, [resources]);

  function deleteResource(id) {
    if (window.confirm("¿Seguro que quieres eliminar este recurso?")) {
      axios
        .delete(`http://localhost:8081/eliminarRecurso/${id}`)
        .then((respuesta) => {
          if (respuesta.data.Estatus === "Exitoso") {
            console.log("si");
          }
        });
    }
  }
  return (
    <>
      <div className="resource-table">
        <div className="box-resource">
          <h2 className="title-resource">Recursos</h2>
          <div className="search-resource">
            <div className="border-search-resource">
              <input
                type="search"
                placeholder="Buscar Recurso"
                className="input-resource"
              />
              <FaSearch size={20} />
            </div>
            <Link to="/resources/add" className="btn-add-resource">
              Agregar
            </Link>
          </div>
          <div className="cont-table-resource">
            <div className="">
              <table className="content-table">
                <tr className="row-one">
                  <th className="head-table-resource">Nombre del recurso</th>
                  <th className="head-table-resource">Tipo del recurso</th>
                  <th className="head-table-resource">Cantidad del recurso</th>
                  <th className="head-table-resource">Estado del recurso</th>
                  <th className="head-table-resource">Editar</th>
                  <th className="head-table-resource">Eliminar</th>
                </tr>

                {resources.map((resource) => (
                  <tr key={resource.id_recurso} className="td-request-admin">
                    <td className="">{resource.nombre_recurso}</td>
                    <td className="">{resource.tipo_recurso}</td>
                    <td className="">{resource.cantidad_recurso}</td>
                    <td className="">{resource.nombre_estado}</td>
                    <td className="">
                      <Link
                        className="edit-trash-resource"
                        to={`/resources/edit/${resource.id_recurso}`}
                      >
                        <FaPencilAlt />
                      </Link>
                    </td>
                    <td className="">
                      <FaTrashAlt
                        onClick={() => deleteResource(resource.id_recurso)}
                        className="trash-resource"
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

export default ResourcesTable;
