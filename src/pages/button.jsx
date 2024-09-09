import React, { useState } from 'react';

export default function Button() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    contrasena: ''
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
      const response = await fetch('http://localhost:3000/users/v1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
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
      <input
        type="text"
        name="email"
        className="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="contrasena"
        className="password"
        value={formData.contrasena}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
      
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
