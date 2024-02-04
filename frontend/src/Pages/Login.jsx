import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Aquí puedes agregar más validaciones si lo necesitas
    if (!email || !password) {
      alert('Por favor, rellena todos los campos.');
      return;
    }
    

    try {
      const response = await axios.post('http://localhost:8081/login', {
        correo_usuario: email,
        contrasena_usuario: password
      });

      // Aquí manejas la respuesta y rediriges al usuario
      const { token, path } = response.data;
      console.log(token);
      console.log(path);

      // Guardar token en localStorage o en un estado global con Context o Redux
      localStorage.setItem('token', token);

      // Redirigir al usuario basado en el rol
      navigate(path);
    } catch (error) {
      // Manejar errores aquí, por ejemplo mostrando un mensaje al usuario
      alert('Las credenciales no son válidas o hubo un error en el servidor');
    }
  };

  return (
    <>
      <div className="box-login">
        <div className="login-container">
          <h2>Iniciar sesión</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="label-login">
              Correo Electrónico
              <input
                type="email"
                name="email"
                placeholder="Ingresa tu Correo Electrónico"
                required
                className="cred-login"
                value={email}
                onChange={handleEmailChange}
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
                value={password}
                onChange={handlePasswordChange}
              />
            </label>
            <div className="cont-btn-login">
              <button type="submit" className="btn-login">
                ¡Comienza ahora!
              </button>
            </div>
          </form>
          <Link className="link-register" to="/register">
            Registrarse
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
