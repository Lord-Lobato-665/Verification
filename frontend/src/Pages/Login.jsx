import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password || !verificationCode) {
      alert('Por favor, rellena todos los campos.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8081/verify', {
        correo_usuario: email,
        contraseña_usuario: password,
        codigo_verificacion: verificationCode
      });
  
      const { token, path } = response.data;
  
      localStorage.setItem('token', token);
  
      navigate(path);
    } catch (error) {
      alert('Las credenciales o el código de verificación no son válidos.');
    }
  };  

  const handleSendVerificationCode = async () => {
    try {
      // Aquí debes enviar el código de verificación al correo electrónico del usuario
      await axios.post('http://localhost:8081/sendverificationcode', {
        correo_usuario: email
      });
      alert('Se ha enviado un código de verificación al correo electrónico.');
    } catch (error) {
      alert('Hubo un error al enviar el código de verificación.');
    }
  };

  return (
    <>
      <div className="box-login">
        <div className="login-container fade-in-left">
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
            <label htmlFor="verificationCode" className="label-login">
              Verificación
              <input
                type="text"
                name="verificationCode"
                placeholder="Ingresa tu Código de Verificación"
                required
                className="cred-login"
                value={verificationCode}
                onChange={handleVerificationCodeChange}
              />
            </label>
            <div className="cont-btn-login">
              <button type="submit" className="button">
                <span className="button_lg">
                  <span className="button_sl"></span>
                  <span className="button_text"> Comienza ahora! </span>
                </span>
              </button>
            </div>
          </form>
          <button onClick={handleSendVerificationCode}>Enviar Código de Verificación</button>
          <Link className="link-register" to="/register">
            Registrarse
          </Link>
        </div>
        <div className="color-one"></div>
      </div>
      <div className='deco-ab'>
        <div className="container">
          <div className="card">
            Explora tus ideas
          </div>
          <div className="card">
            Deja fluir tu creatividad
          </div>
          <div className="card">
            Maximiza tu eficiencia
          </div>
          <div className="card">
            Trabaja con sinergia
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
