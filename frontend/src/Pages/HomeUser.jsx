import SideBarUser from "../components/SideBarUser";
import HeaderUser from "../components/HeaderUser";
import "../styles/HomeUser.css";
const HomeUser = () => {
  return (
    <>
    <SideBarUser/>
    <HeaderUser/>
    <div className="container-home-user">
      Home user
    </div>
    </>
  )
}

export default HomeUser