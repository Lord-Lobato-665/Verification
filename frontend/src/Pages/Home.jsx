import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css";
import HeaderHome from "../components/HeaderHome";
import ImgLanding from "../images/img-landing.jpg";
import Carousel from "../components/Carousel";
import Proyecto1 from "../images/Proyecto1.jpg";
import Proyecto2 from "../images/Proyecto2.jpg";
import Proyecto3 from "../images/Proyecto3.jpg";
import Footer from "../components/Footer";

/* 080417 */
const Home = () => {
  const images = [Proyecto1, Proyecto2, Proyecto3];

  return (
    <>
      <HeaderHome />
      <Carousel images={images} />
      <div className="home1">
        <img className="img-welcome" src={ImgLanding} alt="Proyectos" />
        <div className="home-welcome">
          <h3 className="title-welcome">Sobre nosotros</h3>
          <p className="parrafo-welcome">
            Optimiza la gestión de tus proyectos con nuestra innovadora
            herramienta, simplifica la colaboración, seguimiento de tareas y
            maximiza la eficiencia en cada etapa del proyecto
          </p>
          <Link to="/nosotros">
            <button type="submit" className="btn-login">
              Comenzar
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
