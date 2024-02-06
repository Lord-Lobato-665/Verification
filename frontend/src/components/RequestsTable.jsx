import "../styles/RequestsTable.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiFillCheckCircle } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";


const RequestsTable = () => {
  return (
    <>
      <div className="resource-table">
        <div className="box-resource">
          <h2 className="tittle">Peticiones</h2>
          <div className="cont-table-resource">
            <div className="margin-table-resources">
              <table className="item-table-resource">
                <tr className="row-one">
                  <th className="head-table-resource">Proyecto</th>
                  <th className="head-table-resource">Recurso</th>
                  <th className="head-table-resource">Cantidad</th>
                  <th className="head-table-resource">Aceptar</th>
                  <th className="head-table-resource">Rechazar</th>
                </tr>
                <tr>
                  <td className="body-table-resource">TaskUnity</td>
                  <td className="body-table-resource">Laptos</td>
                  <td className="body-table-resource">5</td>
                  <td className="body-table-resource"><Link className="edit-trash-resource" to="/resources/edit"><AiFillCheckCircle /></Link>
                  </td>
                  <td className="body-table-resource"><Link className="edit-trash-resource" to="/resources/delete" ><AiFillCloseCircle /></Link>
                  </td>




                </tr>
                <tr>
                  <td className="body-table-resource">UTask</td>
                  <td className="body-table-resource">Memoria Ram</td>
                  <td className="body-table-resource">16</td>
                  <td className="body-table-resource"><Link className="edit-trash-resource" to="/resources/edit"><AiFillCheckCircle /></Link>
                  </td>
                  <td className="body-table-resource"><Link className="edit-trash-resource" to="/resources/delete"><AiFillCloseCircle /></Link>
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

export default RequestsTable;
