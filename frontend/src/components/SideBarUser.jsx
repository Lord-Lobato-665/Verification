import React from "react";
import { Link } from "react-router-dom";
import { GrResources } from "react-icons/gr";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { BsCardChecklist } from "react-icons/bs";
import { FaUserGear, FaUsersGear } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";
import LogoTaskUnity from "../images/logodos.png";
import "../styles/SideBarUser.css";

function SideBarAdmin() {
    return (
        <>
            <div className="sidebar-user">
                <div className="container-nombre-user">
                    <h1 className="sidebar-nombre-user">Task Unity 2</h1>
                </div>
                <div>
                    <div className="logo-container-user">
                        <img src={LogoTaskUnity} alt="img" className="logo-img-user" />
                    </div>
                </div>
                <ul className="nav_list desing-list-user">
                    <li className="contain-li-user">
                        <Link to="/404" className="link-container-user">
                            <span className="text-user">Recursos</span>
                            <GrResources className="icon-sidebar-user" />
                        </Link>
                    </li>
                    <li className="contain-li-user">
                        <Link to="/404" className="link-container-user">
                            <span className="text-user">Usuarios</span>
                            <FaUserGear className="icon-sidebar-user" />
                        </Link>
                    </li>
                    <li className="contain-li-user">
                        <Link to="/404" className="link-container-user">
                            <span className="text-user">Proyectos</span>
                            <AiOutlineFundProjectionScreen className="icon-sidebar-user" />
                        </Link>
                    </li>
                    <li className="contain-li-user">
                        <Link to="/404" className="link-container-user">
                            <span className="text-user">Miembros</span>
                            <FaUsersGear className="icon-sidebar-user" />
                        </Link>
                    </li>
                    <li className="contain-li-user">
                        <Link to="/404" className="link-container-user">
                            <span className="text-user">Peticiones</span>
                            <BsCardChecklist className="icon-sidebar-user" />
                        </Link>
                    </li>
                    <li className="contain-li-user">
                        <Link to="/404" className="link-container-user">
                            <span className="text-user">Salir</span>
                            <BiLogOut className="icon-sidebar-user" />
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default SideBarAdmin;