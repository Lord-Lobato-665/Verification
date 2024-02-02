import React, { useState, useEffect } from 'react';
import '../styles/Carousel.css'; // Asegúrate de tener estilos CSS para tu carrusel

const Carousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [title, setTitle] = useState('Task Unity');

  useEffect(() => {
    const interval = setInterval(() => {
      // Cambiar la imagen cada 3 segundos
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonta

  }, [images.length]);

  return (
    <div className="carousel-container">
      <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />
      <h2 className="editable-title" contentEditable={true} onBlur={(e) => setTitle(e.target.innerText)}>
        {title}
      </h2>
    </div>
  );
};

export default Carousel;
