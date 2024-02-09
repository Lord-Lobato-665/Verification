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
  const [error, setError] = useState("");

  const getErrorColor = () => {
    switch (error) {
      case "contraseña Debil":
        return "red"; // Rojo para contraseña débil
      case "contraseña Normal":
        return "orange"; // Naranja para contraseña normal
      case "contraseña Buena":
        return "green"; // Verde para contraseña buena
      case "No puede contener el carácter '<'":
        return "blue";
      default:
        return "black"; // Negro por defecto
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Verifica si el campo modificado es 'nombre' y si contiene el carácter '<'
    if (name === "nombre" && value.includes("<")) {
      // Puedes establecer un mensaje de error o simplemente ignorar la entrada
      setError("No puede contener el carácter '<'");
    } else if (name === "email" && value.includes("<")) {
      setError("No puede contener el carácter '<'");
    } else {
      // Si no es el campo 'nombre' o si el valor es válido, actualiza el estado normalmente
      setUser({ ...user, [name]: value });
      // Asegúrate de limpiar cualquier mensaje de error anterior si la entrada ahora es válida
      if (error !== "") setError("");
    }
  };

  const passwor = (e) => {
    const { value } = e.target;
    console.log(value);
    if (value.length <= 4) {
      setError("contraseña Debil");
    } else if (value.length <= 6) {
      setError("contraseña Normal");
    } else if (value.length > 8) {
      setError("contraseña Buena");
    }
    setUser({
      ...user,
      password: value,
    });
  };
  console.log(error);
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
    if (user.password.length < 4) {
      alert("La contraseña debe tener al menos 4 caracteres.");
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
              <p className="tittle-label">Nombre</p>
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
              <p className="tittle-label">Correo Electrónico</p>
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
              <p className="tittle-label">Contraseña</p>
              <input
                type="password"
                name="password"
                placeholder="Ingresa tu Contraseña"
                required
                className="cred-login"
                value={user.password}
                onChange={passwor}
              />
              <span style={{ color: getErrorColor() }} className="span-re">
                <br />
                {error}
              </span>
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
      <div className="deco-ab">
        <div className="container">
          <div className="card">Descubre tu potencial</div>
          <div className="card">Tu próximo gran proyecto te espera</div>
          <div className="card">Alcanza tus metas</div>
          <div className="card">Únete ahora!</div>
        </div>
      </div>
    </>
  );
};

export default Register;
