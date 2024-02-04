import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [user, setUser] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const navegacion = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!user.nombre || !user.email || !user.password) {
      alert("Por favor, rellena todos los campos.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(user.email)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }
    if (user.password.length < 3) {
      alert("La contraseña debe tener al menos 3 caracteres.");
      return;
    }

    // Envía los datos al servidor
    try {
      const response = await axios.post("http://localhost:8081/register", {
        nombre_usuario: user.nombre,
        correo_usuario: user.email,
        contrasena_usuario: user.password,
      });

      console.log("Usuario registrado:", response.data);
      navegacion("/login");
    } catch (error) {
      // Maneja el error aquí
      // Por ejemplo, si el servidor devuelve un error:
      alert(error.response.data);
    }
  };

  return (
    <>
      <div className="box-login">
        <div className="login-container">
          <h2>Registrarse</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="nombre" className="label-login">
              Nombre
              <input
                type="text"
                name="nombre"
                placeholder="Ingresa tu Nombre"
                required
                className="cred-login"
                value={user.nombre}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="email" className="label-login">
              Correo Electrónico
              <input
                type="email"
                name="email"
                placeholder="Ingresa tu Correo Electrónico"
                required
                className="cred-login"
                value={user.email}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="password" className="label-login">
              Contraseña
              <input
                type="password"
                name="password"
                placeholder="Ingresa tu Contraseña"
                required
                className="cred-login"
                value={user.password}
                onChange={handleChange}
              />
            </label>
            <div className="cont-btn-login">
              <button type="submit" className="btn-login">
                Registrar
              </button>
            </div>
            <Link className="link-register" to="/login">
              Iniciar Sesión
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
