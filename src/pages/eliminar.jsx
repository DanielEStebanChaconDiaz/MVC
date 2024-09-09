import React, { useState } from 'react';

export default function Eliminar() {
  const [formData, setFormData] = useState({
    nombre: '',
  });

  const [errors, setErrors] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
        const response = await fetch(`http://localhost:3000/users/v3${formData.nombre}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
      } else {
        const errorData = await response.json();
        setErrors(errorData.errors);
        console.error('Error:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombre"
        className="name"
        value={formData.nombre}
        onChange={handleChange}
      />
      <button type="submit">Eliminar</button>
      
      {errors.length > 0 && (
        <div>
          <h4>Errores:</h4>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error.msg}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}
