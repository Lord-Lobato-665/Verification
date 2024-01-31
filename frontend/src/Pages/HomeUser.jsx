import SideBarUser from "../components/SideBarUser";
import HeaderUser from "../components/HeaderUser";
import "../styles/HomeUser.css";
import { FaPlus } from "react-icons/fa";

const HomeUser = () => {
  return (
    <>
      <SideBarUser />
      <HeaderUser />
      <div className="container-home-user">
      <br />
        <div className="button-create-project-user-position">
          <button class="button-create-project">
            <span class="button_lg-create-project">
              <span class="button_sl-create-project"></span>
              <span class="button_text-create-project"> 
              Crear proyecto 
              <br /><br />
              <FaPlus className="plus-create-project"/>
              </span>
            </span>
          </button>
        </div>
        <div>
          <p>-- Proyectos --</p>
        </div>
      </div>
    </>
  )
}

export default HomeUser