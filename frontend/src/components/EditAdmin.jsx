import SideBarAdmin from "./SideBarAdmin"
import HeaderAdmin from "./HeaderAdmin"
const EditAdmin = () => {
  return (
  <>
  <HeaderAdmin/>
  <SideBarAdmin/>
  <div className="cont-edit-resource">
        <h2 className="title-edit-resource">Edita el Recurso</h2>
        <form /* onSubmit={editarRecurso} */>
        <div  className="box-edit-resource">

          <div className="center-add-resource">
          <label className="label-name-resource">
            Nombre del recurso
    <input
      type="text"
      name="nombre"
     /*  value={recurso.nombre}
      onChange={handleChange} */
      required
      />
      </label>
      </div>

      <div className="center-add-resource">
      <label className="label-name-resource"> Tipo de recurso
    <select name="tipo" /* value={recurso.tipo} onChange={handleChange} */ required>
      <option /* value={recurso.tipo} */ >{/* {recurso.tipo} */} </option>
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
     /*  value={recurso.cantidad}
      onChange={handleChange} */
      required
      />
      </label>
      </div>
      <div className="center-add-resource">
      <label className="label-name-resource" >
        Estado
          <select name="estado"/*  value={recurso.estado} onChange={handleChange} */ required>
      <option /* value={recurso.id} */>{/* {recurso.estado} */}</option>
     {/*  {recurso.estado==="Disponible"? <option value="No disponible">No disponible</option>:<option value="Disponible">Disponible</option> } */}
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

export default EditAdmin