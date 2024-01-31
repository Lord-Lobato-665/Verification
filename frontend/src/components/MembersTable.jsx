import "../styles/MembersTable.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";


const MembersTable = () => {
  return (
    <>
      <div className="resource-table">
        <div className="box-resource">
          <h2 className="title-resource">Miembros</h2>
          <div className="search-resource">
            <div className="border-search-resource">
            <input type="search" placeholder="Buscar miembro"  className="input-resource"/>
            <FaSearch size={20} />
            </div>
                <Link to="/members/add" className="btn-add-member">+</Link>
          </div>
          <div className="cont-table-resource">
            <div className="margin-table-resources">
          <table className="item-table-resource">
            <tr className="row-one">
                <th className="head-table-resource">Nombre del miembro</th>
                <th className="head-table-resource">Correo</th>
                <th className="head-table-resource">Proyecto</th>
                <th className="head-table-resource">Especialidad</th>
                <th className="head-table-resource">Editar</th>
                <th className="head-table-resource">Eliminar</th>
            </tr>
            <tr>
                <td className="body-table-resource">Gxhel</td>
                <td className="body-table-resource">gxhel@gmail.com</td>
                <td className="body-table-resource">TaskUnity</td>
                <td className="body-table-resource">Frontend</td>
                <td className="body-table-resource"><Link className="edit-trash-resource" to="/resources/edit"><FaPencilAlt /></Link>
</td>
<td className="body-table-resource"><Link className="edit-trash-resource" to="/resources/delete" ><FaTrashAlt/></Link>
</td>
             
               


            </tr>
            <tr>
                <td className="body-table-resource">Test</td>
                <td className="body-table-resource">test@gmail.com</td>
                <td className="body-table-resource">TaskUnity</td>
                <td className="body-table-resource">Backend</td>
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

export default MembersTable;
