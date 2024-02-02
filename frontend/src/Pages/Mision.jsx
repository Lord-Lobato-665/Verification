import ImgMision from '../images/mision.jpg';
import ImgVision from '../images/vision.jpg';
import HeaderHome from '../components/HeaderHome';
import Footer from '../components/Footer';

const Mision = () => {
  return (
    <>
      <HeaderHome />
      <div className='home1'>
        <img className='img-welcome' src={ImgMision} alt="Misión" />
        <div className='home-welcome'>
          <h3 className='title-welcome'>Misión</h3>
          <p className='parrafo-welcome'>Facilitamos el crecimiento empresarial mediante una gestión de proyectos eficiente y colaborativa. Comprometidos con la productividad y la ejecución exitosa, ofrecemos una plataforma web intuitiva y poderosa</p>
        </div>
      </div>

      <div className='home1'>
        <div className='home-welcome2'>
          <h3 className='title-welcome'>Visión</h3>
          <p className='parrafo-welcome'>Aspiramos a liderar la transformación en la gestión de proyectos empresariales, fomentando la innovación y la colaboración global para asegurar el éxito a través de tecnologías avanzadas y una experiencia de usuario excepcional</p>
        </div>
        <img className='img-welcome' src={ImgVision} alt="Visión" />
      </div>

      <Footer />
    </>
  );
};

export default Mision;
