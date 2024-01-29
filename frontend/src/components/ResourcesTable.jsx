import "../styles/ResourcesTable.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";


const ResourcesTable = () => {
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
            <tr>
                <td className="body-table-resource">Laptop</td>
                <td className="body-table-resource">Hardware</td>
                <td className="body-table-resource">5</td>
                <td className="body-table-resource">Disponible</td>
                <td className="body-table-resource"><Link className="edit-trash-resource" to="/resources/edit"><FaPencilAlt /></Link>
</td>
<td className="body-table-resource"><Link className="edit-trash-resource" to="/resources/delete" ><FaTrashAlt/></Link>
</td>
             
               


            </tr>
            <tr>
                <td className="body-table-resource">Laptop</td>
                <td className="body-table-resource">Hardware</td>
                <td className="body-table-resource">5</td>
                <td className="body-table-resource">Disponible</td>
                <td className="body-table-resource"><Link className="edit-trash-resource" to="/resources/edit"><FaPencilAlt /></Link>
</td>
<td className="body-table-resource"><Link className="edit-trash-resource" to="/resources/delete"><FaTrashAlt/></Link>
</td>

            </tr>
          </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResourcesTable;
