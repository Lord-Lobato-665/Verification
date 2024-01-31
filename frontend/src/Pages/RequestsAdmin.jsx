import '../styles/RequestsAdmin.css'
import SideBarAdmin from "../components/SideBarAdmin"
import HeaderAdmin from "../components/HeaderAdmin"
import { Link } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { useEffect,useState } from 'react';
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { BsFillHandThumbsDownFill } from "react-icons/bs";


const RequestsAdmin = () => {
    const [peticiones,setPeticiones]=useState([]);
    
useEffect(()=>{
    const MostrarPeticiones =async ()=>{
        const response = await fetch("http://localhost:8081/mostrarPeticiones");
        const data = await response.json();
        setPeticiones(data.contenido);
    }
    MostrarPeticiones();
    console.log(peticiones);

},[])


  return (
    <>
    <HeaderAdmin/>
    <SideBarAdmin/>
    <div className="resource-table">
        <div className="box-resource">
          <h2 className="title-resource">Peticiones</h2>
          <div className="search-resource">
            <div className="border-search-resource">
            <input type="search" placeholder="Buscar Petición"  className="input-resource"/>
            <FaSearch size={20} />
            </div>
               
          </div>
          <div className="cont-table-resource">
            <div className="margin-table-resources">
            <table className="content-table">
        <thead>
          <tr>
          <th>Petición</th>
            <th>Descripción</th>
            <th>Nombre del miembro</th>
            <th>Estado</th>
            <th>Aceptar</th>
            <th>Rechazar</th>
          </tr>
        </thead>
        <tbody>
         {peticiones.map((peticion)=>(
            <tr key={peticion.id_peticion} className='td-request-admin'>
                <td>{peticion.nombre_peticion}</td>
                <td>{peticion.descripcion_peticion}</td>
                <td>{peticion.nombre_usuario}</td>
                <td>{peticion.nombre_estado}</td>
                <td><BsFillHandThumbsUpFill className='accept-request' color='green'size={20} />
</td>
<td>
<BsFillHandThumbsDownFill className='exit-request' color='red' size={20} />

</td>


            </tr>

         ))}
        </tbody>
      </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RequestsAdmin