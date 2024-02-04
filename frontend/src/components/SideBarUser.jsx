import React, { useState, useEffect } from "react";
import { MdAccessTimeFilled } from "react-icons/md";
import { ImUsers, ImUser } from "react-icons/im";
import { FaPlus } from "react-icons/fa";
import LogoTaskUnity from "../images/logodos.png";
import Cube from "../components/Cube";
import "../styles/SideBarUser.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

function SideBarUser() {
  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [orderByRecent, setOrderByRecent] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token de localStorage
    navigate("/login"); // Redirige al usuario a la página de inicio de sesión
  };
  const fetchTeams = async () => {
    try {
      let endpoint = "http://localhost:8081/obtenerEquipos";

      if (orderByRecent) {
        endpoint = "http://localhost:8081/obtenerEquiposInvertido";
      }

      const response = await fetch(endpoint);
      const data = await response.json();
      if (data.Estatus === "Exitoso") {
        setTeams(data.contenido);
      } else {
        console.log("Error al obtener equipos");
      }
    } catch (error) {
      console.error("Error de red", error);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedTeam(e.target.value);
    setOrderByRecent(e.target.value === "recent");
  };

  const fetchMembers = async () => {
    try {
      const response = await fetch("http://localhost:8081/obtenerMiembros");
      const data = await response.json();
      if (data.Estatus === "Exitoso") {
        setMembers(data.contenido);
      } else {
        console.log("Error al obtener miembros");
      }
    } catch (error) {
      console.error("Error de red", error);
    }
  };

  useEffect(() => {
    fetchTeams();
    fetchMembers();
  }, [orderByRecent]);

  return (
    <div className="sidebar-user">
      <div className="container-nombre-user">
        <h1 className="sidebar-nombre-user">Task Unity</h1>
      </div>
      <div>
        <div className="logo-container-user">
          <Cube />
          {<img src={LogoTaskUnity} alt="img" className="logo-img-user" />}
        </div>
      </div>
      <br />
      <div className="rec-user">
        <MdAccessTimeFilled />
        <p>Equipos recientes</p>
      </div>

      <div className="list-container-user">
        <div>
          <select
            value={selectedTeam}
            onChange={handleSelectChange}
            className="list-style-user"
          >
            <option value="">Equipos</option>
            <option value="recent">Equipos recientes</option>
            {teams.map((team, index) => (
              <option key={index} value={team.id_equipo}>
                {team.nombre_proyecto} - {team.especialidad_equipo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
            className="list-style-user"
          >
            <option value="">Miembros</option>
            {members.map((member, index) => (
              <option key={index} value={member.id_miembro}>
                {member.nombre_usuario}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="container-buttons-user">
        {[
          { icon: ImUsers, text: "Equipo Nuevo" },
          { icon: ImUser, text: "Añadir Miembros" },
        ].map((button, index) => (
          <div key={index}>
            <button className="buttons-user">
              <div className="button-content">
                {React.createElement(button.icon)}
                <br />
                {button.text}
              </div>
              <div className="button-hover-content">
                <FaPlus />
              </div>
            </button>
          </div>
        ))}

        <Link onClick={handleLogout} className="yeye">
          <span>Salir</span>
          <BiLogOut className="" />
        </Link>
      </div>
    </div>
  );
}

export default SideBarUser;
