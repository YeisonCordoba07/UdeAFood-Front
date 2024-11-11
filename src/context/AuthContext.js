import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Cargar el usuario desde localStorage cuando se inicia la aplicación
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));  // Restablecer el estado del usuario
        }
    }, []);

    // Función de inicio de sesión
    const login = async (correo, clave) => {
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo, clave }),
            });

            if (!response.ok) {
                throw new Error('Credenciales inválidas');
            }

            const userData = await response.json();
            setUser(userData); // Guarda el usuario en el estado

            // Guardar el usuario en localStorage para que persista al recargar la página
            localStorage.setItem('user', JSON.stringify(userData));

        } catch (error) {
            throw new Error(error.message); // Manejo de errores
        }
    };

    // Función de cierre de sesión
    const logout = () => {
        setUser(null); // Eliminar el usuario del estado
        localStorage.removeItem('user'); // Eliminar el usuario de localStorage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
