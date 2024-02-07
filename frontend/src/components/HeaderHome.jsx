import { Link } from "react-router-dom";
import "../styles/HeaderHome.css";
import LogoHeader from "../images/logodos.png";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import useStore from "./useStore";

/* 080417 */
const HeaderHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token de localStorage
    navigate("/login"); // Redirige al usuario a la página de inicio de sesión
  };

  const setTareas = useStore((state) => state.setTareas);
  const tareas = useStore((state) => state.tareas);
  useEffect(() => {
    const mostrarTareas = async () => {
      const token = localStorage.getItem("token"); //obtener el token
      const decoded = jwtDecode(token);
      const id = decoded.id;
      const response = await fetch(
        `http://localhost:8081/obtenerTareasMiembro/${id}`
      );
      const data = await response.json();
      if (data.Estatus === "Exitoso") {
        setTareas(data.contenido);
      }
    };
    mostrarTareas();
  }, []);
  console.log(setTareas);

  return (
    <>
      <header className="header-home">
        <ul className="nav-links">
          <Link to="/home">
            <img className="logo-header" src={LogoHeader} alt="Logo" />
          </Link>
          <li className="center">
            <Link to="/nosotros">Nosotros</Link>
          </li>
          <li className="center">
            <Link to="/mision">Misión y visión</Link>
          </li>
          {tareas.length >= 1 ? (
            <li className="center">
              <span style={{ cursor: "pointer" }} className="span-home">
                <Link to="/peticion">Petición</Link>
              </span>
            </li>
          ) : null}

          {tareas.length >= 1 ? (
            <li className="center">
              <span style={{ cursor: "pointer" }} className="span-home">
                <Link to="/tareas">Tareas</Link>
              </span>
            </li>
          ) : null}
          <Link onClick={handleLogout} className="yeye">
            <span>Salir</span>
            <BiLogOut className="" />
          </Link>
        </ul>
      </header>
    </>
  );
};

export default HeaderHome;
