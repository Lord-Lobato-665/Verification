import SideBarAdmin from "../components/SideBarAdmin"
import HeaderAdmin from "../components/HeaderAdmin"
import StatsTable from "../components/StatsTable"
import "../styles/HeaderAdmin.css"
const HomeAdmin = () => {
  return (
    <>
      <SideBarAdmin />
      <HeaderAdmin />
      <StatsTable />
    </>
  )
}

export default HomeAdmin