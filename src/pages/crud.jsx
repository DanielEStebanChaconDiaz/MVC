import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Asegúrate de usar react-router para la navegación
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Importa jwt-decode correctamente
import Find from "./findName";
import Eliminar from "./eliminar";
import Button from "./button";

export default function Crud() {
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Hook para la navegación

    useEffect(() => {
        // Configurar el interceptor de respuesta para manejar errores de autenticación
        const responseInterceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    // Si el error es 401, el token ha expirado o es inválido
                    localStorage.removeItem('token'); // Remover token expirado
                    setMessage('Sesión expirada. Por favor, vuelva a iniciar sesión.');
                    navigate("/"); // Redirigir al inicio de sesión usando react-router
                }
                return Promise.reject(error);
            }
        );

        // Configurar el interceptor de solicitud para incluir el token
        axios.interceptors.request.use((config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        // Verificar el token al montar el componente
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000; // Convertir el tiempo actual a segundos

                if (decodedToken.exp < currentTime) {
                    // Si el token ha expirado
                    localStorage.removeItem('token'); // Remover token expirado
                    setMessage('Sesión expirada. Por favor, vuelva a iniciar sesión.');
                    navigate("/"); // Redirigir al inicio de sesión usando react-router
                }
            } catch (error) {
                console.error('Error decodificando el token:', error);
                localStorage.removeItem('token'); // Remover token inválido
                setMessage('Error en la sesión. Por favor, vuelva a iniciar sesión.');
                navigate("/"); // Redirigir al inicio de sesión en caso de error
            }
        } else {
            // Si no hay token, redirigir al inicio de sesión
            navigate("/"); // Redirigir al inicio de sesión usando react-router
        }

        // Cleanup de los interceptores al desmontar el componente
        return () => {
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, [navigate]);

    return (
        <>
            {message && <p>{message}</p>}
            <Find />
            <Button />
            <Eliminar />
        </>
    );
}
