import "../styles/HeaderAdmin.css";
import { FaSearch } from "react-icons/fa";
import Perfil from "../images/perfil.jpg";
import { IoIosNotifications } from "react-icons/io";


function HeaderAdmin() {

    return (
        <>
            <div className="header-container-admin">
                <div className="input-container-admin">
                    <input type="text" name="text" className="input-admin" placeholder="Buscar..." />
                    <span className="icon-input-admin"><FaSearch /></span>
                </div>
            </div>
            <IoIosNotifications className="notification" />
            <div className="perfil-container">
                <img src={Perfil} alt="img" className="perfil" />
            </div>
        </>
    );
}

export default HeaderAdmin;
