import { Link } from "react-router-dom";
import { GrResources } from "react-icons/gr";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { BsCardChecklist } from "react-icons/bs";
import { FaUserGear, FaUsersGear } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";
import LogoTaskUnity from "../images/logodos.png";
import { useNavigate } from "react-router-dom";
import "../styles/SideBarAdmin.css";

function SideBarAdmin() {
  const navigate = useNavigate(); // Hook de react-router-dom para la navegación

  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token de localStorage
    navigate("/login"); // Redirige al usuario a la página de inicio de sesión
  };
  return (
    <>
      <div className="sidebar">
        <div className="container-nombre">
          <Link to="/Admin">
            <h1 className="sidebar-nombre">Task Unity</h1>
          </Link>
        </div>
        <div>
          <div className="logo-container">
            <Link to="/Admin">
              <img src={LogoTaskUnity} alt="img" className="logo-img" />
            </Link>
          </div>
        </div>
        <ul className="nav_list desing-list">
          <li className="contain-li">
            <Link to="/resources" className="link-container">
              <span>Recursos</span>
              <GrResources className="icon-sidebar" />
            </Link>
          </li>
          <li className="contain-li">
            <Link to="/users" className="link-container">
              <span>Usuarios</span>
              <FaUserGear className="icon-sidebar" />
            </Link>
          </li>
          <li className="contain-li">
            <Link to="/projects" className="link-container">
              <span>Proyectos</span>
              <AiOutlineFundProjectionScreen className="icon-sidebar" />
            </Link>
          </li>
          <li className="contain-li">
            <Link to="/members" className="link-container">
              <span>Miembros</span>
              <FaUsersGear className="icon-sidebar" />
            </Link>
          </li>
          <li className="contain-li">
            <Link to="/requests" className="link-container">
              <span>Peticiones</span>
              <BsCardChecklist className="icon-sidebar" />
            </Link>
          </li>

          <li className="contain-li">
            <Link onClick={handleLogout} className="link-container">
              <span>Salir</span>
              <BiLogOut className="icon-sidebar" />
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SideBarAdmin;
