import SideBarAdmin from "../components/SideBarAdmin"
import RequestsTable from "../components/RequestsTable"
import HeaderAdmin from "../components/HeaderAdmin"
import "../styles/RequestsAdmin.css"

const RequestsAdmin = () => {
  return (
    <>
      <HeaderAdmin />
      <SideBarAdmin />
      <RequestsTable />

    </>
  )
}

export default RequestsAdmin