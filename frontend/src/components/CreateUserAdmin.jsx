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
    <HeaderAdmin/>
    <SideBarAdmin/>
    <div className="box-create-user">
      <h2>Crear Nuevo Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Usuario:</label>
          <input
            type="text"
            name="nombre_usuario"
            value={nuevoUsuario.nombre_usuario}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email" // Usar type="email" para validación básica de email
            name="correo_usuario"
            value={nuevoUsuario.correo_usuario}
            onChange={handleChange}
            required
          />
        </div>
        <div>
            <label>Contraseña:</label>
            <input
              type="password" // Usar type="password" para ocultar la entrada
              name="contrasena_usuario"
              value={nuevoUsuario.contrasena_usuario}
              onChange={handleChange}
              required
            />
          </div>
        <button type="submit">Crear Usuario</button>
      </form>
    </div>
    </>
  )
}

export default CreateUserAdmin