import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeAdmin from "./Pages/HomeAdmin";
import PageNotFound from "./Pages/404";
import HomeUser from "./Pages/HomeUser";
/* Anexo 1 a apps.js */
import ResourcesAdmin from "./Pages/ResourcesAdmin";
import EditResource from "./components/EditResource";
import AddResource from "./components/AddResource";
import DeleteResource from "./components/DeleteResource";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import MembersAdmin from "./Pages/MembersAdmin";
import RequestsAdmin from "./Pages/RequestsAdmin";
import AddMember from "./components/AddMember";
import RequestsAdmin from "./Pages/RequestsAdmin";
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/User" element={<HomeUser />} />
          <Route path="/Admin" element={<HomeAdmin />} />
          <Route path="/404" element={<PageNotFound />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resources" element={<ResourcesAdmin />} />
          <Route path="/resources/edit" element={<EditResource />} />
          <Route path="/resources/add" element={<AddResource />} />
          <Route path="/resources/delete" element={<DeleteResource />} />
          <Route path="/requests" element={<RequestsAdmin />} />

          <Route path="/members" element={<MembersAdmin />} />
          <Route path="/members/add" element={<AddMember />} />
          <Route path="/requests" element={<RequestsAdmin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App