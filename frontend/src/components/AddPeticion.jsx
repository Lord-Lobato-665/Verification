import SideBarUser from "./SideBarUser";
import HeaderUser from "./HeaderUser";
import { jwtDecode } from "jwt-decode";
const AddPeticion = () => {
  const token = localStorage.getItem("token"); //obtener el token
  const decoded = jwtDecode(token);
  const id = decoded.id;
  return (
    <>
      <HeaderUser />
      <SideBarUser />
      <div></div>
    </>
  );
};

export default AddPeticion;
