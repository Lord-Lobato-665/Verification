import SideBarAdmin from "./SideBarAdmin"
import HeaderAdmin from "./HeaderAdmin"
import "../styles/AddResource.css"
import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
const AddResource = () => {
 const [recurso,setRecurso]=useState({
  nombre:"",
  tipo:"",
  cantidad:"",
  estado:""
 })
 const [estados, setEstados] = useState([]);
 const navigate=useNavigate();
  // Actualiza el estado al cambiar los valores del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecurso({ ...recurso, [name]: value });
  };

 const CrearRecurso = (e) => {
  e.preventDefault();
  // Validar todos los campos requeridos.
  if (!recurso.nombre || !recurso.tipo || recurso.cantidad <= 0 || !recurso.estado) {
    window.alert('Por favor, complete todos los campos requeridos.');
    return;
  }
  axios
    .post("http://localhost:8081/crearRecurso",  {
      nombre: recurso.nombre,
      tipo: recurso.tipo,
      cantidad: parseInt(recurso.cantidad, 10),
      estado: parseInt(recurso.estado, 10)
    })
    .then((respuesta) => {
      if (respuesta.data.Estatus === "Exitoso") {
        navigate("/resources");
      }
    })
    .catch((error) => console.log(error));
};


useEffect(() => {
  const cargarEstados = async () => {
    try {
      const response = await fetch('http://localhost:8081/obtenerEstados');
      if (!response.ok) {
        console.log('La respuesta de la red no fue ok.');
      } else if (response.headers.get("content-type").includes("application/json")) {
        const data = await response.json();
        if (data.Estatus === "Exitoso") {
          setEstados(data.contenido);
          console.log(data.contenido);
        } else {
          console.log('La respuesta no fue exitosa.');
        }
      } else {
        console.log('No se recibió JSON');
      }
    } catch (error) {
      console.error('Hubo un problema con la operación fetch:', error);
    }
  };
  cargarEstados();
}, []);



  return (
   <>
     <HeaderAdmin/>
    <SideBarAdmin/>
<div className="bg-add-resource" >
    <form className="form-add-resource" onSubmit={CrearRecurso}>
        <h2 className="tittle-add-resource">
            Agregar Recurso
        </h2>
        <div className="cred-add-resource">
            <div className="cont-a">
      <div className="input-add-resource">
        <label>Nombre del Recurso:</label>
        <input
          type="text"
          required
          name="nombre"
          value={recurso.nombre}
          onChange={handleChange}
          />
      </div>
          </div>

          <div className="cont-a">
         
      <div className="input-add-resource">
        <label>Tipo de Recurso:</label>
        <select required name="tipo"  onChange={handleChange} value={recurso.tipo}>
          <option value="">Seleccione un tipo de recurso</option>
          <option value="Hardware">Hardware</option>
          <option value="Software">Software</option>
          <option value="Humano">Humano</option>
          <option value="Digital">Digital</option>
          <option value="Material">Material</option>
        </select>
      </div>
          </div>


<div className="cont-a">
      <div className="input-add-resource">
        <label>Cantidad del Recurso:</label>
        <input
          type="number"
          min="1"
          required
          value={recurso.cantidad}
          name="cantidad"
          onChange={handleChange}
          />
      </div>
          </div>



<div className="cont-a">

      <div className="input-add-resource">
        <label>Estado del Recurso:</label>
        <select required value={recurso.estado} name="estado" onChange={handleChange}>
          <option value="">Seleccione un estado</option>
          {estados.map((estado) => (
            <option key={estado.id_estado} value={estado.id_estado}>
              {estado.nombre_estado}
            </option>
          ))}
        </select>
      </div>
          </div>


          </div>
          <div className="cont-btn-add-resource">
      <button className="btn-create-resource" type="submit">Agregar Recurso</button>
          </div>
    </form>
          </div>
   </>
  )
}

export default AddResource