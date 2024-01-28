import SideProvicional from "../components/SideProvicional"
import ResourcesTable from "./ResourcesTable"
import "../styles/ResourcesAdmin.css"
const ResourcesAdmin = () => {
  return (
    <>
    <div className="cont-re">
    <SideProvicional/>
    <ResourcesTable/>
    </div>

    </>
  )
}

export default ResourcesAdmin