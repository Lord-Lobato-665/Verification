import SideBarAdmin from "./SideBarAdmin"
import HeaderAdmin from "./HeaderAdmin"
import { useEffect,useState } from "react"
import '../styles/EditResource.css'
import { useParams } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const EditResource = () => {
  const [recurso, setRecurso] = useState({
    id:"",
    nombre: '',
    tipo: '',
    cantidad: '',
    estado: ''
  });

  const {id} = useParams();
  const navigate = useNavigate();

  
  
  /*   // Verifica si el campo es 'cantidad' o 'estado' y conviértelo a entero
    const intValue = (name === 'cantidad' || name === 'estado') ? parseInt(value, 10) : value;
   */
    const handleChange = (e) => {
      const { name, value } = e.target;
      setRecurso(prev => ({ ...prev, [name]: value }));
    };
  
  
 
  
  useEffect(() => {
    const fetchRecurso = async () => {
      const response = await fetch(`http://localhost:8081/obtenerRecurso/${id}`);
      const data = await response.json();
      if (data.Estatus === "Exitoso") {
        const datRecurso=data.contenido;
        console.log(datRecurso);
        setRecurso({
          id: datRecurso.id_recurso.toString(),
          nombre: datRecurso.nombre_recurso,
          tipo: datRecurso.tipo_recurso,
          cantidad: datRecurso.cantidad_recurso.toString(), // Asegúrate de convertir a string si es necesario
          estado: datRecurso.nombre_estado
        });
        console.log(recurso);
      }
    };
    fetchRecurso();
  }, [id]);


  const editarRecurso = (e) => {
    e.preventDefault();
    if(recurso.estado==="Disponible"){
      recurso.estado=1;
    }else{
      recurso.estado=2;
    }
    console.log(recurso)
    axios
      .put(`http://localhost:8081/editarRecurso/${id}`, recurso)
      .then((respuesta) => {
        if (respuesta.data.Estatus === "Exitoso") {
          navigate("/resources");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
    <HeaderAdmin/>
    <SideBarAdmin/>
    <div className="cont-edit-resource">
        <h2 className="title-edit-resource">Edita el Recurso</h2>
        <form onSubmit={editarRecurso}>
        <div  className="box-edit-resource">

          <div className="center-add-resource">
          <label className="label-name-resource">
            Nombre del recurso
    <input
      type="text"
      name="nombre"
      value={recurso.nombre}
      onChange={handleChange}
      required
      />
      </label>
      </div>

      <div className="center-add-resource">
      <label className="label-name-resource"> Tipo de recurso
    <select name="tipo" value={recurso.tipo} onChange={handleChange} required>
      <option value={recurso.tipo} >{recurso.tipo} </option>
      {/* Opciones de tipos */}
    </select>
      </label>
      </div>
      <div className="center-add-resource">
      <label className="label-name-resource">
  Cantidad
    <input
    min="1"
      type="number"
      name="cantidad"
      value={recurso.cantidad}
      onChange={handleChange}
      required
      />
      </label>
      </div>
      <div className="center-add-resource">
      <label className="label-name-resource" >
        Estado
          <select name="estado" value={recurso.estado} onChange={handleChange} required>
      <option value={recurso.id}>{recurso.estado}</option>
      {recurso.estado==="Disponible"? <option value="No disponible">No disponible</option>:<option value="Disponible">Disponible</option> }
      {/* Opciones de estados */}
    </select>
 
      </label>
      </div>
      </div>
      <div className="cont-btn-act">
    <button type="submit" className="btn-act-resource">Actualizar Recurso</button>
      </div>
  </form>
    </div>
    
    </>
  )
}

export default EditResource