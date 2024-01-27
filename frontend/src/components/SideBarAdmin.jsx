import LogoTaskUnity from "../images/logodos.png"
import "../styles/SideBarAdmin.css"
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { GrResources } from "react-icons/gr";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { FaPeopleGroup } from "react-icons/fa6";
import { RiChatNewFill } from "react-icons/ri";
function SideBarAdmin() {
  return (
    <>
    <div className="sidebar">
        <div className="logo_content">
            <div className="logo">
                <div className="logo_image">
                    <img src={LogoTaskUnity} alt="img" className="logo_general"/>

                </div>
                <div className="logo_name">
                    Task Unity
                </div>
                

            </div>
                <RxHamburgerMenu id="btn" />

        </div>
        <ul className="nav_list">
            <li>
                <Link>
                <GrResources />
                <span>
                    Recursos
                </span>
                </Link>
                
            </li>
            <li>
                <Link>
                <AiOutlineFundProjectionScreen />
                <span>
                    Proyectos
                </span>
                </Link>
                
            </li>
            <li>
                <Link>
                <FaPeopleGroup />
                <span>
                    Miembros
                </span>
                </Link>
                
            </li>
            <li>
                <Link>
                <RiChatNewFill />
                <span>
                    Peticiones
                </span>
                </Link>
                
            </li>
        </ul>

    </div>
    </>
  )
}

export default SideBarAdmin