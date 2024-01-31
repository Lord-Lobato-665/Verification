import SideBarAdmin from "../components/SideBarAdmin"
import MembersTable from "../components/MembersTable"
import HeaderAdmin from "../components/HeaderAdmin"
import "../styles/MembersAdmin.css"

const MembersAdmin = () => {
  return (
    <>
      <HeaderAdmin />
      <SideBarAdmin />
      <MembersTable />

    </>
  )
}

export default MembersAdmin