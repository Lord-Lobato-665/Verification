import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RutaProtegida = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  if (!token) {
    // No hay token, redirige al login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (e) {
    // Error al decodificar el token, redirige al login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Define una función que verifica si el rol tiene permiso para la ruta actual
  const hasPermissionForRoute = () => {
    const { role } = decoded;

    switch (location.pathname) {
      case "/home":
      case "/mision":
      case "/nosotros":
        return role === 1; // Miembro normal
      case "/user":
      case "/otros-componentes-para-lideres":
        return role === 2; // Miembro líder
      case "/Admin":
      case "/resources":
      case "/resources/edit/:id":
      case "/resources/add":
      case "/resources/delete":
      case "/projects":
      case "/requests":
      case "/users":
      case "/users/edit/:id":
      case "/users/add":
      case "/members":
      case "/members/add":
      case "/project/add":
        return role === 3; // Administrador
      default:
        return false; // Ruta no permitida por defecto
    }
  };

  // Verifica si el rol tiene permiso para la ruta actual
  if (!hasPermissionForRoute()) {
    // Si no tiene permiso, redirige a una página de error o al login
    return <Navigate to="/404" state={{ from: location }} replace />;
  }

  // Si el rol tiene permiso para la ruta actual, renderiza los hijos del componente
  return children;
};

export default RutaProtegida;
