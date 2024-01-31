import SideBarAdmin from "./SideBarAdmin"
import HeaderAdmin from "./HeaderAdmin"
import "../styles/AddMember.css"
import { useState, useEffect } from 'react';
const AddMember = () => {
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
      <HeaderAdmin />
      <SideBarAdmin />
      <div className="bg-add-resource" >
        <form onSubmit={handleSubmit} className="form-add-resource">
          <h2 className="tittle-add-resource">
            Agregar miembro
          </h2>
          <div className="cred-add-resource">
            <div className="cont-a">
              <div className="input-add-resource">
                <label>Nombre del miembro:</label>
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
                <label>Correo electrónico:</label>
                <input
                  type="email"
                  value={nombreRecurso}
                  onChange={(e) => setNombreRecurso(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="cont-a">

              <div className="input-add-resource">
                <label>Proyecto:</label>
                <select value={tipoRecurso} onChange={(e) => setTipoRecurso(e.target.value)} required>
                  <option value="">Proyectos existentes</option>
                  <option value="Humano">TaskUnity</option>
                  <option value="Material">UTask</option>
                </select>
              </div>
            </div>

            <div className="cont-a">
              <div className="input-add-resource">
                <label>Especialidad:</label>
                <input
                  type="text"
                  value={nombreRecurso}
                  onChange={(e) => setNombreRecurso(e.target.value)}
                  required
                />
              </div>
            </div>


          </div>
          <div className="cont-btn-add-resource">
            <button className="btn-create-resource" type="submit">Agregar miembro</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddMember