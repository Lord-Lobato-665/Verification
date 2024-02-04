import { Link } from "react-router-dom";
import "../styles/HeaderHome.css";
import LogoHeader from "../images/logodos.png";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
/* 080417 */
const HeaderHome = () => {
  const navigate =useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token de localStorage
    navigate("/login"); // Redirige al usuario a la página de inicio de sesión
  };
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
          <li className="center">
            <Link to="/home">Proyectos</Link>
          </li>
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
