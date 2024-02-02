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
import UsersAdmin from "./Pages/UsersAdmin";
import EditAdmin from "./components/EditUserAdmin";
import CreateUserAdmin from "./components/CreateUserAdmin";
import Home from "./Pages/Home";
import Mision from "./Pages/Mision";
import AboutUs from "./Pages/AboutUs";
import ProjectsAdmin from "./Pages/ProjectsAdmin";
import RutaProtegidaAdmin from "./components/protectedRoutes/RutaProtegidaAdmin";
import RutaProtegidaUsuario from "./components/protectedRoutes/RutaProtegidaUsuario";
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/404" element={<PageNotFound />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resources" element={<ResourcesAdmin />} />
          <Route path="/resources/edit/:id" element={<EditResource />} />
          <Route path="/resources/add" element={<AddResource />} />
          <Route path="/resources/delete" element={<DeleteResource />} />
          <Route path="/requests" element={<RequestsAdmin />} />
          <Route path="/users" element={<UsersAdmin />} />
          <Route path="/users/edit/:id" element={<EditAdmin />} />
          <Route path="/users/add" element={<CreateUserAdmin />} />
          <Route path="/Admin" element={<RutaProtegidaAdmin><HomeAdmin /></RutaProtegidaAdmin>} />
          <Route path="/user" element={<RutaProtegidaUsuario><HomeUser /></RutaProtegidaUsuario>} />
          <Route path="/projects" element={<ProjectsAdmin />} />

          <Route path="/members" element={<MembersAdmin />} />
          <Route path="/members/add" element={<AddMember />} />
          <Route path="/requests" element={<RequestsAdmin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mision" element={<Mision />} />
          <Route path="/nosotros" element={<AboutUs />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App