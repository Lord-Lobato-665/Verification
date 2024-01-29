import SideBarAdmin from "./SideBarAdmin"
import HeaderAdmin from "./HeaderAdmin"
import "../styles/AddResource.css"
import { useState, useEffect } from 'react';
const AddResource = () => {
    const [nombreRecurso, setNombreRecurso] = useState('');
    const [tipoRecurso, setTipoRecurso] = useState('');
    const [cantidadRecurso, setCantidadRecurso] = useState('');
    const [estadoRecurso, setEstadoRecurso] = useState('');
    const [estados, setEstados] = useState([]);

    useEffect(() => {
        // Aquí deberías cargar los estados desde tu base de datos
        const cargarEstados = async () => {
          // Usa fetch o Axios para cargar los datos desde tu backend
          // setEstados(resultadoDeLaCarga);
        };
        cargarEstados();
      }, []);

      const handleSubmit = (e) => {
        e.preventDefault();
        // Realizar validaciones aquí si es necesario
        onSubmit({
          nombre_recurso: nombreRecurso,
          tipo_recurso: tipoRecurso,
          cantidad_recurso: Number(cantidadRecurso),
          id_estado_id: estadoRecurso,
        });
      };
  return (
   <>
     <HeaderAdmin/>
    <SideBarAdmin/>
<div className="bg-add-resource" >
    <form onSubmit={handleSubmit} className="form-add-resource">
        <h2 className="tittle-add-resource">
            Agregar Recurso
        </h2>
        <div className="cred-add-resource">
            <div className="cont-a">
      <div className="input-add-resource">
        <label>Nombre del Recurso:</label>
        <input
          type="text"
          value={nombreRecurso}
          onChange={(e) => setNombreRecurso(e.target.value)}
          required
          />
      </div>
          </div>

          <div className="cont-a">
         
      <div className="input-add-resource">
        <label>Tipo de Recurso:</label>
        <select value={tipoRecurso} onChange={(e) => setTipoRecurso(e.target.value)} required>
          <option value="">Seleccione un tipo de recurso</option>
          <option value="Humano">Humano</option>
          <option value="Material">Material</option>
        </select>
      </div>
          </div>


<div className="cont-a">
      <div className="input-add-resource">
        <label>Cantidad del Recurso:</label>
        <input
          type="number"
          value={cantidadRecurso}
          onChange={(e) => setCantidadRecurso(e.target.value)}
          min="0"
          required
          />
      </div>
          </div>



<div className="cont-a">

      <div className="input-add-resource">
        <label>Estado del Recurso:</label>
        <select value={estadoRecurso} onChange={(e) => setEstadoRecurso(e.target.value)} required>
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