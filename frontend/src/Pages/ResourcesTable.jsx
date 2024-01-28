import "../styles/ResourcesTable.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";


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
                <Link className="btn-add-resource">Agregar</Link>
          </div>
          <div className="cont-table-resource">
            <div className="margin-table-resources">
          <table className="item-table-resource">
            <tr className="row-one">
                <th className="head-table-resource">Nombre del recurso</th>
                <th className="head-table-resource">Tipo del recurso</th>
                <th className="head-table-resource">Cantidad del recurso</th>
                <th className="head-table-resource">Estado del recurso</th>
            </tr>
            <tr>
                <td className="body-table-resource">Laptop</td>
                <td className="body-table-resource">Hardware</td>
                <td className="body-table-resource">5</td>
                <td className="body-table-resource">Disponible</td>

            </tr>
            <tr>
                <td className="body-table-resource">Laptop</td>
                <td className="body-table-resource">Hardware</td>
                <td className="body-table-resource">5</td>
                <td className="body-table-resource">Disponible</td>

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
