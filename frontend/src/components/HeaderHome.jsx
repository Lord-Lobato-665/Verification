import { Link, useNavigate } from 'react-router-dom';
import "../styles/HeaderHome.css";
import LogoHeader from "../images/logodos.png";

/* 080417 */
const HeaderHome = () => {

  return (
    <>
      <header className='header-home'>
        <ul className="nav-links">
          <Link to="/home"><img className='logo-header' src={LogoHeader} alt="Logo" /></Link>
          <li className="center"><Link to="/nosotros">Nosotros</Link></li>
          <li className="center"><Link to="/mision">Misión y visión</Link></li>
          <li className="center"><Link to="/home">Proyectos</Link></li>

          <Link to="/login"><button type="submit" className="btn-login">
            Ingresar
          </button>
          </Link>
          <Link to="/register"><button type="submit" className="btn-login">
            Registrarme
          </button>
          </Link>
        </ul>
      </header>
    </>
  );
};

export default HeaderHome