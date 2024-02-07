import "../styles/TareasUser.css";
import useStore from "./useStore";
import axios from "axios";
const TareasUser = () => {
  const actutarea = async (id) => {
    console.log(id);
    console.log(tareas);
    await axios.post(`http://localhost:8081/marcarTarea/${id}`).then((res) => {
      if (res.data.Estatus === "Exitoso") {
        window.alert("Tarea entregada Exitosamente");
      }
    });
  };
  const tareas = useStore((state) => state.tareas);

  return (
    <>
      <div className="box-tar-user">
        {tareas.map((e) => (
          <div key={e.id_tarea} className="cart-tar-user">
            <div className="header-tarea">Tarea</div>
            <div className="name-tar-user">
              <span className="span-name">Nombre de la tarea:</span>
              <p>{e.nombre_tarea}</p>
            </div>
            <div className="name-tar-user">
              <span className="span-name">Descripción de la Tarea:</span>
              <p>{e.descripcion_tarea}</p>
            </div>
            <div className="name-tar-user">
              <span className="span-name">Estado de la Tarea:</span>
              <p>{e.nombre_estado}</p>
            </div>
            <div className="name-tar-user">
              <span className="span-name">Marcar completado:</span>
              <br />
              <button
                className="btn-tarea"
                onClick={() => {
                  actutarea(e.id_tarea);
                }}
              >
                Terminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TareasUser;
