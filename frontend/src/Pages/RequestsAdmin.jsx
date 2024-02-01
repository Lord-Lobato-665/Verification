import '../styles/ReqAdmin.css'
import SideBarAdmin from "../components/SideBarAdmin"
import HeaderAdmin from "../components/HeaderAdmin"
import { FaSearch } from "react-icons/fa";
import { useEffect,useState } from 'react';
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { BsFillHandThumbsDownFill } from "react-icons/bs";



const RequestsAdmin = () => {
    const [peticiones,setPeticiones]=useState([]);

    function confirmarPeticion(id) {
      if (window.confirm("¿Estás seguro de que quieres aceptar esta petición?")) {
        const aceptarPeticion = async () => {
          try {
            const response = await fetch(`http://localhost:8081/aceptarPeticion/${id}`, {
              method: 'PUT', // Suponiendo que el método para aceptar la petición sea PUT
              headers: {
                'Content-Type': 'application/json',
                // Aquí puedes agregar más headers si es necesario, como un token de autenticación
              },
              // Si necesitas enviar un cuerpo en la petición, agrégalo aquí
            });
    
            if (response.ok) {
              console.log('Peticion aceptada');
              // Aquí puedes agregar lo que desees hacer después de aceptar la petición,
              // como actualizar el estado o mostrar un mensaje de éxito.
            } else {
              console.error('Error al aceptar la petición');
              // Maneja el error como creas conveniente
            }
          } catch (error) {
            console.error('Error en la petición: ', error);
            // Maneja el error como creas conveniente
          }
        };
    
        aceptarPeticion();
      } else {
        // El usuario hizo clic en "Cancelar", así que no haces nada
      }
    }

    function rechazarPeticion(id) {
      if (window.confirm("¿Estás seguro de que quieres rechazar esta petición?")) {
        const aceptarPeticion = async () => {
          try {
            const response = await fetch(`http://localhost:8081/rechazarPeticion/${id}`, {
              method: 'PUT', // Suponiendo que el método para aceptar la petición sea PUT
              headers: {
                'Content-Type': 'application/json',
                // Aquí puedes agregar más headers si es necesario, como un token de autenticación
              },
              // Si necesitas enviar un cuerpo en la petición, agrégalo aquí
            });
    
            if (response.ok) {
              console.log('Peticion aceptada');
              // Aquí puedes agregar lo que desees hacer después de aceptar la petición,
              // como actualizar el estado o mostrar un mensaje de éxito.
            } else {
              console.error('Error al aceptar la petición');
              // Maneja el error como creas conveniente
            }
          } catch (error) {
            console.error('Error en la petición: ', error);
            // Maneja el error como creas conveniente
          }
        };
    
        aceptarPeticion();
      } else {
        // El usuario hizo clic en "Cancelar", así que no haces nada
      }
    }
    
    
    
useEffect(()=>{
    const MostrarPeticiones =async ()=>{
        const response = await fetch("http://localhost:8081/mostrarPeticiones");
        const data = await response.json();
        setPeticiones(data.contenido);
    }
    MostrarPeticiones();
    console.log(peticiones);

},[peticiones])


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
            <div >
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
                <td><BsFillHandThumbsUpFill className='accept-request'onClick={()=>{confirmarPeticion(peticion.id_peticion)}} color='green'size={20} />
</td>
<td>
<BsFillHandThumbsDownFill className='exit-request' color='red' size={20} onClick={()=>{rechazarPeticion(peticion.id_peticion)}} />

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