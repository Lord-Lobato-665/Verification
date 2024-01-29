import { Link } from "react-router-dom"
const Login = () => {
  return (
    <>
    <div className="box-login">
    <div className="login-container">
  <h2>Iniciar sesión</h2>
  <form>
    <label htmlFor="" className="label-login">
Correo Electronico
    <input type="email" placeholder="Ingresa tu Correo Electronico" required="true" className="cred-login" />
    </label>
    <label htmlFor="" className="label-login">
    Contraseña
    <input type="password" placeholder="Ingresa tu Contraseña" required="true" className="cred-login" />
    </label>
<div className="cont-btn-login">
    <button type="submit" className="btn-login">
      ¡Comienza ahora!
    </button>
</div>

<Link className="link-register" to="/register">
Registrarse
</Link>
  </form>
</div>
    </div>
    </>
  )
}

export default Login