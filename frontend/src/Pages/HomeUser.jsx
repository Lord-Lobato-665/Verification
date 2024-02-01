import SideBarUser from "../components/SideBarUser";
import HeaderUser from "../components/HeaderUser";
import "../styles/HomeUser.css";
import { FaPlus } from "react-icons/fa";

const HomeUser = () => {
  return (
    <>
      <SideBarUser />
      <HeaderUser />
      <br />
      <div className="container-home-user">
          <p>---- Equipos ----</p>
      </div>
    </>
  )
}

export default HomeUser