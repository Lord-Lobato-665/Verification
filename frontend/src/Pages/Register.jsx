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
        <div className="login-container fade-in-right">
          <h2>Registrarse</h2>
          <br />
          <form onSubmit={handleSubmit}>
            <label htmlFor="nombre" className="label-login">
            <p className='tittle-label'>Nombre</p>
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
            <br />
            <br />
            <label htmlFor="email" className="label-login">
            <p className='tittle-label'>Correo Electrónico</p>
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
            <br />
            <br />
            <label htmlFor="password" className="label-login">
            <p className='tittle-label'>Contraseña</p>
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
            <br />
            <div className="cont-btn-login">
              <button type="submit" className="button">
                <span className="button_lg">
                  <span className="button_sl"></span>
                  <span className="button_text"> Registrar! </span>
                </span>
              </button>
            </div>
            <Link className="link-register" to="/login">
              Iniciar Sesión
            </Link>
          </form>
        </div>
        <div className="color-one"></div>
      </div>
      <div className='deco-ab'>
          <div className="container">
            <div className="card">
            Descubre tu potencial
            </div>
            <div className="card">
            Tu próximo gran proyecto te espera
            </div>
            <div className="card">
             Alcanza tus metas
            </div>
            <div className="card">
              Únete ahora!
            </div>
          </div>
        </div>
    </>
  );
};

export default Register;
