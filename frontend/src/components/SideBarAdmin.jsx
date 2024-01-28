import React from "react";
import { Link } from "react-router-dom";
import { GrResources } from "react-icons/gr";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { BsCardChecklist } from "react-icons/bs";
import { FaUserGear, FaUsersGear } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";
import LogoTaskUnity from "../images/logodos.png";
import "../styles/SideBarAdmin.css";

function SideBarAdmin() {
    return (
        <>
            <div className="sidebar">
                <div className="container-nombre">
                    <h1 className="sidebar-nombre">Task Unity</h1>
                </div>
                <div>
                    <div className="logo-container">
                        <img src={LogoTaskUnity} alt="img" className="logo-img" />
                    </div>
                </div>
                <ul className="nav_list desing-list">
                    <li className="contain-li">
                        <Link to="/404" className="link-container">
                            <span>Recursos</span>
                            <GrResources className="icon-sidebar" />
                        </Link>
                    </li>
                    <li className="contain-li">
                        <Link to="/404" className="link-container">
                            <span>Usuarios</span>
                            <FaUserGear className="icon-sidebar" />
                        </Link>
                    </li>
                    <li className="contain-li">
                        <Link to="/404" className="link-container">
                            <span>Proyectos</span>
                            <AiOutlineFundProjectionScreen className="icon-sidebar" />
                        </Link>
                    </li>
                    <li className="contain-li">
                        <Link to="/404" className="link-container">
                            <span>Miembros</span>
                            <FaUsersGear className="icon-sidebar" />
                        </Link>
                    </li>
                    <li className="contain-li">
                        <Link to="/404" className="link-container">
                            <span>Peticiones</span>
                            <BsCardChecklist className="icon-sidebar" />
                        </Link>
                    </li>
                    <li className="contain-li">
                        <Link to="/404" className="link-container">
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
