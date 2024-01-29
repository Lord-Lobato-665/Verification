import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({
    nombre: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!user.nombre || !user.email || !user.password) {
      alert('Por favor, rellena todos los campos.');
      return;
    }

    // Aquí iría la lógica para enviar los datos a la base de datos
    console.log('Datos enviados:', user);

    // Resetear el formulario (opcional)
    setUser({ nombre: '', email: '', password: '' });
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
