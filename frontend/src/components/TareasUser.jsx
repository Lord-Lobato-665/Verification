import { useLocation } from "react-router-dom";
import HeaderHome from "./HeaderHome";
import "../styles/TareasUser.css";
const TareasUser = () => {
  const location = useLocation();
  const { tareas } = location.state || { tareas: [] };
  console.log(tareas);
  return (
    <>
      <HeaderHome />
      <div className="box-tar-user">
        {tareas.map((e) => (
          <div key={e.id_tarea} className="cart-tar-user">
            <div className="name-tar-user">
              <span>Nombre de la tarea:</span>
              <p>{e.nombre_tarea}</p>
            </div>
            <div className="name-tar-user">
              <span>Descripción de la Tarea:</span>
              <p>{e.descripcion_tarea}</p>
            </div>
            <div className="name-tar-user">
              <span>Estado de la Tarea:</span>
              <p>{e.nombre_estado}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TareasUser;
