import { Link, useNavigate } from 'react-router-dom';
import "../styles/AboutUs.css";
import HeaderHome from '../components/HeaderHome';
import ImgAbout from '../images/nosotros.jpg';
import Footer from '../components/Footer';

/* 080417 */
const AboutUs = () => {
  return (
    <>
      <HeaderHome />
      <div className="container-about">
        <div className="image-container">
          <img src={ImgAbout} alt="Descripción de la imagen" />
          <div className="title">¿Quiénes somos?</div>
        </div>
      </div>

      <div className='home1'>
        <div className='home-about'>
          <h3 className='title-welcome'>Task Unity es...</h3>
          <p className='parrafo-about'>Nuestra web revoluciona la gestión de proyectos empresariales, proporcionando una plataforma integral que simplifica la planificación, seguimiento y colaboración. Impulsada por tecnologías avanzadas, nuestra herramienta optimiza la eficiencia y promueve el éxito de los equipos empresariales</p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutUs