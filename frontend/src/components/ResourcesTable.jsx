import "../styles/ResourcesTable.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useEffect,useState } from "react";


const ResourcesTable = () => {
  const[resources,setResources]=useState([]);

  useEffect(()=>{
    const cargarRecursos=async ()=>{
      try{
        const response=await fetch('http://localhost:8081/obtenerRecursos');
        const data =await response.json();
        if (data.Estatus === "Exitoso") {
          setResources(data.contenido);
          console.log(data.contenido);
        } else {
          console.log('La respuesta no fue exitosa.');
        }

      }catch (error){
        console.log(error);
      }
    }
    cargarRecursos();

  },[]);
  return (
    <>
      <div className="resource-table">
        <div className="box-resource">
          <h2 className="title-resource">Recursos</h2>
          <div className="search-resource">
            <div className="border-search-resource">
            <input type="search" placeholder="Buscar Recurso"  className="input-resource"/>
            <FaSearch size={20} />
            </div>
                <Link to="/resources/add" className="btn-add-resource">Agregar</Link>
          </div>
          <div className="cont-table-resource">
            <div className="margin-table-resources">
          <table className="item-table-resource">
            <tr className="row-one">
                <th className="head-table-resource">Nombre del recurso</th>
                <th className="head-table-resource">Tipo del recurso</th>
                <th className="head-table-resource">Cantidad del recurso</th>
                <th className="head-table-resource">Estado del recurso</th>
                <th className="head-table-resource">Editar</th>
                <th className="head-table-resource">Eliminar</th>
            </tr>
          
              {resources.map((resource)=>(
                 <tr key={resource.id_recurso}>
                 <td className="body-table-resource">{resource.nombre_recurso}</td>
                 <td className="body-table-resource">{resource.tipo_recurso}</td>
                 <td className="body-table-resource">{resource.cantidad_recurso}</td>
                 <td className="body-table-resource">{resource.nombre_estado}</td>
                 <td className="body-table-resource"><Link className="edit-trash-resource" to={`/resources/edit/${resource.id_recurso}`}><FaPencilAlt /></Link>
 </td>
 <td className="body-table-resource"><FaTrashAlt/>
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
