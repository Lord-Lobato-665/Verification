import SideBarAdmin from "./SideBarAdmin"
import HeaderAdmin from "./HeaderAdmin"
import axios from "axios";
import { useState } from "react";
import '../styles/CreateUserAdmin.css'
import { useNavigate } from "react-router-dom";
const CreateUserAdmin = () => {

   // Estado inicial para el nuevo usuario
   const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre_usuario: '',
    correo_usuario: '',
    contrasena_usuario: '' // Agregar campo de contraseña
  });
  const navigate =useNavigate();
  

   // Maneja los cambios en los campos de entrada y actualiza el estado
   const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

   // Maneja el envío del formulario
   const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    try {
      const response = await axios.post('http://localhost:8081/register', nuevoUsuario);
      const data = response.data;

      if (data.Estatus === 'Exitoso') {
        alert('Usuario creado con éxito');
        // Aquí puedes redirigir al usuario o limpiar el formulario
        setNuevoUsuario({ nombre_usuario: '', correo_usuario: '', contrasena_usuario: '' });
        navigate("/users");
      } else {
        alert('Error al crear el usuario');
      }
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      alert('Error al crear el usuario');
    }
  };    
  return (
    
    <>
    <SideBarAdmin/>
    <div className="box-create-user">
  <h2>Crear Nuevo Usuario</h2>
  <form onSubmit={handleSubmit} className="form-create-user">
    <div className="form-group">
      <label htmlFor="nombre_usuario">Nombre del Usuario:</label>
      <input
        type="text"
        id="nombre_usuario"
        name="nombre_usuario"
        value={nuevoUsuario.nombre_usuario}
        onChange={handleChange}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="correo_usuario">Correo Electrónico:</label>
      <input
        type="email"
        id="correo_usuario"
        name="correo_usuario"
        value={nuevoUsuario.correo_usuario}
        onChange={handleChange}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="contrasena_usuario">Contraseña:</label>
      <input
        type="password"
        id="contrasena_usuario"
        name="contrasena_usuario"
        value={nuevoUsuario.contrasena_usuario}
        onChange={handleChange}
        required
      />
    </div>
    <button type="submit" className="btn-create-user">Crear Usuario</button>
  </form>
</div>
    </>
  )
}

export default CreateUserAdmin