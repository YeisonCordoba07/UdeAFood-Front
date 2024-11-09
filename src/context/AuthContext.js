
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const parsedUserData = JSON.parse(storedUserData);
            setUser(parsedUserData); // Actualiza el estado `user`
        }
    }, []);



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

            localStorage.setItem('userData', JSON.stringify(userData));

            setUser(userData); // Guarda el usuario en el contexto
        } catch (error) {
            throw new Error(error.message); // Manejo de errores
        }
    };


    const logout = () => {
        setUser(null);
        localStorage.removeItem('userData');
    };



    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
