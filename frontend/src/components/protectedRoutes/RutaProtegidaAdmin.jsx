import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RutaProtegidaAdmin = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (e) {
    // En caso de error al decodificar el token, redirige al login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (decoded.role !== "Admin") {
    // Si el rol no es Admin, redirige al login o a una página de error
    return <Navigate to="/404" state={{ from: location }} replace />;
  }

  return children; // Si el rol es Admin, renderiza los hijos del componente
};

export default RutaProtegidaAdmin;
