import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const CreateProjectModal = ({ isOpen, onRequestClose, onCreateProject }) => {
  const [formData, setFormData] = useState({
    Nombre: '',
    Descripcion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreateProject = async () => {
    // Validar campos antes de enviar la solicitud
    if (!formData.Nombre || !formData.Descripcion) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      // Enviar la solicitud al servidor
      const response = await axios.post('http://localhost:8081/insertarProyecto/', formData);

      // Verificar la respuesta del servidor
      if (response.data.Estatus === 'Exitoso') {
        alert('Se ingresó correctamente a la Base de datos');
        
        // Llama a la función onCreateProject del componente padre con los datos del nuevo proyecto
        onCreateProject(formData.Nombre, formData.Descripcion);

        // Limpia los campos después de crear el proyecto
        setFormData({
          Nombre: '',
          Descripcion: '',
        });

        // Cierra el modal
        onRequestClose();
      } else {
        // Manejar caso de respuesta no exitosa
        alert('Se ha producido un error en el servidor');
      }
    } catch (error) {
      // Manejar errores de la solicitud HTTP
      console.error('Error en la solicitud HTTP', error);
      alert('Se ha producido un error en la solicitud HTTP');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Crear Proyecto"
    >
      <h2>Crear Proyecto</h2>
      <label>Nombre del Proyecto:</label>
      <input
        type="text"
        name="Nombre"
        onChange={handleChange}
        value={formData.Nombre}
      />
      <label>Descripción del Proyecto:</label>
      <textarea
        name="Descripcion"
        value={formData.Descripcion}
        onChange={handleChange}
      />
      <button onClick={handleCreateProject}>Crear Proyecto</button>
    </Modal>
  );
};

export default CreateProjectModal;
