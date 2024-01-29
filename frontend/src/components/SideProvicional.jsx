import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { GrResources } from "react-icons/gr";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { FaPeopleGroup } from "react-icons/fa6";
import { RiChatNewFill } from "react-icons/ri";
import LogoProvicional from "../images/logodos.png";
import { PiTimerDuotone } from "react-icons/pi";
import { MdOutlineFavorite } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import "../styles/SideProvicional.css"


const SideProvicional = () => {
  return (
    <>
    <div className="sidebarpro">
   
    <div className="toggle-btn">
    <RxHamburgerMenu className="btn-hamburger" size={20} />
    </div>
    <ul className="nav-side">
        <li className="li-log">
            <img src={LogoProvicional} alt="logotipo" className="log-img" />
            <span className="task-unity">Task Unity</span>
        </li>
        <li className="pro-re">
            <Link className="link-first">
            <PiTimerDuotone  className="icon-first" />
            <span>
                Proyectos Recientes
            </span>
            </Link >
        </li>
        <li className="pro-fa">
<Link className="link-first">
<MdOutlineFavorite className="icon-first" />

<span>
    Proyectos Favoritos
</span>

</Link>
        </li>

            <li className="li-side">
                <Link className="link-side">
                <GrResources className="icon-side" size={22}/>
                <span>
                    Recursos
                </span>
                </Link>
                
            </li>
            <li className="li-side">
                <Link className="link-side">
                <AiOutlineFundProjectionScreen className="icon-side"size={22}/>
                <span>
                    Proyectos
                </span>
                </Link>
                
            </li>
            <li className="li-side">
                <Link className="link-side">
                <FaPeopleGroup className="icon-side"size={22}/>
                <span>
                    Miembros
                </span>
                </Link>
                
            </li>
            <li className="li-side">
                <Link className="link-side">
                <RiChatNewFill className="icon-side" size={22}/>
                <span>
                    Peticiones
                </span>
                </Link>
                
            </li>
            <li className="li-side">
                <Link className="link-side">
                <CiLogout className="icon-side" size={22}/>
              
                <span>
                    Salir
                </span>
                </Link>
                
            </li>
        </ul>
    </div>

    </>
  )
}

export default SideProvicional