import "../styles/AddProjectAdmin.css";
import SideBarAdmin from "./SideBarAdmin";
import HeaderAdmin from "./HeaderAdmin";
import { useEffect,useState } from "react";
import axios from "axios";
const AddProjectAdmin = () => {
    const [Usuarios,setUsuarios]=useState([]);
    useEffect(()=>{
        const mostrarUsuarios=async ()=>{
            try{
                await axios.get("http://localhost:8081/obtenerUsuariosDignos")
                .then(
                    (res)=>{
                       if(res.data.Estatus=="Exitoso"){
                        setUsuarios(res.data.contenido);
                       }
                    }
                )

            }catch(error){
                console.log(error);

            }
        }
        mostrarUsuarios();

    },[])
  return (
    <>
      <HeaderAdmin />
      <SideBarAdmin />
      <div className="box-add-project">
        <h2>Crear Nuevo Proyecto</h2>
        <form>
          <div className="label-name-project-admin">
            <label htmlFor="">
              Nombre del Proyecto
              <br />
              <input type="text" placeholder="Ingresa un nombre" />
            </label>
          </div>
          <div className="label-name-project-admin">
            <label htmlFor="">
              Descripción del Proyecto
              <br />
              <input type="text" placeholder="Ingresa una descripción" />
            </label>
          </div>
          <div className="label-name-project-admin">
            <label htmlFor="">
              Lider del Proyecto
              <br />
              
              <select value={Usuarios.nombre_usuario}>
                <option value="">Seleccione un Lider</option>
                {Usuarios.map((usuario)=>(
                <option key={usuario.id_usuario} value={usuario.nombre_usuario}>{usuario.nombre_usuario}</option>

                ))}
              </select>
            </label>
          </div>
          <div className="label-name-project-admin">
            <label htmlFor="">
              Estado del Proyecto
              <br />
              <select value="">
                <option value="">Selecione un Estado</option>
                <option value="Iniciado">Iniciado</option>
                <option value="En proceso">En proceso</option>
                <option value="Finalizado">Finalizado</option>
              </select>
            </label>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProjectAdmin;
