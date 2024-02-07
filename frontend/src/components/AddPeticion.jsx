import HeaderHome from "./HeaderHome";
import { jwtDecode } from "jwt-decode";
const AddPeticion = () => {
  const token = localStorage.getItem("token"); //obtener el token
  const decoded = jwtDecode(token);
  const id = decoded.id;
  return (
    <>
      <HeaderHome />
      <div></div>
    </>
  );
};

export default AddPeticion;
