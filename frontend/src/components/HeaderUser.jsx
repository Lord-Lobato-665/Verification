import "../styles/HeaderUser.css";
import { FaSearch } from "react-icons/fa";
import Perfil from "../images/perfil.jpg";
import { IoIosNotifications } from "react-icons/io";


function HeaderAdmin() {

    return (
        <>
            <div className="header-container-user">
                <div className="input-container-user">
                    <input type="text" name="text" className="input-user" placeholder="Buscar proyecto..." />
                    <span className="icon-input-user"><FaSearch /></span>
                </div>
                <div className="container-invitation-user">
                    <p className="inv-user"> + Invitar miembros</p>
                </div>
            </div>
            <IoIosNotifications className="notification-user" />
            <div className="perfil-container-user">
                <img src={Perfil} alt="img" className="perfil-user" />
            </div>
        </>
    );
}

export default HeaderAdmin;
