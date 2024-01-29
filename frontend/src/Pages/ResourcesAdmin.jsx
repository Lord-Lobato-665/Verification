import SideBarAdmin from "../components/SideBarAdmin"
import ResourcesTable from "../components/ResourcesTable"
import HeaderAdmin from "../components/HeaderAdmin"
import "../styles/ResourcesAdmin.css"
const ResourcesAdmin = () => {
  return (
    <>
   <HeaderAdmin/>
<SideBarAdmin/>
    <ResourcesTable/>

    </>
  )
}

export default ResourcesAdmin