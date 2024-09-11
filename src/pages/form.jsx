import { useState, useEffect } from "react";
import axios from "axios";

export default function Form() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Interceptor para manejar errores de autenticación
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    // Si el error es 401, el token ha expirado o es inválido
                    localStorage.removeItem('token'); // Remover token expirado
                    setMessage('Sesión expirada. Por favor, vuelva a iniciar sesión.');
                    window.location.href = '#/'; // Redirigir al inicio de sesión
                }
                return Promise.reject(error);
            }
        );

        // Cleanup del interceptor al desmontar el componente
        return () => axios.interceptors.response.eject(interceptor);
    }, []);
    axios.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:3000/login', { username, password });
            const { token } = response.data;

            // Almacenar el token en localStorage
            localStorage.setItem('token', token);
            setMessage('Login exitoso!');

            // Redirigir al usuario a la ruta #/Home si el login es exitoso
            window.location.href = '#/Home';
        } catch (error) {
            setMessage('Login fallido: ' + (error.response?.data?.message || 'Error desconocido'));
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Username" 
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                />
                <button type="submit">Login</button>
            </form>
            <p>{message}</p>
        </div>
    );
}
