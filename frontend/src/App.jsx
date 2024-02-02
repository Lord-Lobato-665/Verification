import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeAdmin from "./Pages/HomeAdmin";
import PageNotFound from "./Pages/404";
import HomeUser from "./Pages/HomeUser";
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

import RutaProtegida from "./components/protectedRoutes/RutaProtegida";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Login />} />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users/edit/:id" element={<EditAdmin />} />
          <Route path="/resources/edit/:id" element={<EditResource />} />

          {/* Rutas para miembros comunes */}
          <Route
            path="/mision"
            element={
              <RutaProtegida>
                <Mision />
              </RutaProtegida>
            }
          />
          <Route
            path="/nosotros"
            element={
              <RutaProtegida>
                <AboutUs />
              </RutaProtegida>
            }
          />
          <Route
            path="/home"
            element={
              <RutaProtegida>
                <Home />
              </RutaProtegida>
            }
          />

          {/* Ruta para miembros líderes */}
          <Route
            path="/user"
            element={
              <RutaProtegida>
                <HomeUser />
              </RutaProtegida>
            }
          />

          {/* Ruta para administradores */}
          <Route
            path="/Admin"
            element={
              <RutaProtegida>
                <HomeAdmin />
              </RutaProtegida>
            }
          />
          <Route
            path="/resources"
            element={
              <RutaProtegida>
                <ResourcesAdmin />
              </RutaProtegida>
            }
          />
          <Route
            path="/resources/add"
            element={
              <RutaProtegida>
                <AddResource />
              </RutaProtegida>
            }
          />

          <Route
            path="/resources/delete"
            element={
              <RutaProtegida>
                <DeleteResource />
              </RutaProtegida>
            }
          />
          <Route
            path="/requests"
            element={
              <RutaProtegida>
                <RequestsAdmin />
              </RutaProtegida>
            }
          />
          <Route
            path="/users"
            element={
              <RutaProtegida>
                <UsersAdmin />
              </RutaProtegida>
            }
          />

          <Route
            path="/users/add"
            element={
              <RutaProtegida>
                <CreateUserAdmin />
              </RutaProtegida>
            }
          />

          <Route
            path="/projects"
            element={
              <RutaProtegida>
                <ProjectsAdmin />
              </RutaProtegida>
            }
          />

          <Route
            path="/members"
            element={
              <RutaProtegida>
                <MembersAdmin />
              </RutaProtegida>
            }
          />
          <Route
            path="/members/add"
            element={
              <RutaProtegida>
                <AddMember />
              </RutaProtegida>
            }
          />
          <Route
            path="/requests"
            element={
              <RutaProtegida>
                <RequestsAdmin />
              </RutaProtegida>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
