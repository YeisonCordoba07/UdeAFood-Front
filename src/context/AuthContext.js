import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cliente, setCliente] = useState(null);

    // Cargar el usuario desde localStorage cuando se inicia la aplicación
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));  // Restablecer el estado del usuario
        }
        const savedCliente = localStorage.getItem('cliente');
        if (savedCliente) {
            setCliente(JSON.parse(savedCliente));  // Restablecer el estado del cliente
        }

    }, []);

    // Función de inicio de sesión
    const login = async (correo, clave, tipo = 'tienda') => {
        const endpoint = tipo == 'usuario'
            ?'http://localhost:8080/usuario/login'
            :'http://localhost:8080/login';

        try {
            const response = await fetch(endpoint, {
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
            userData.tipo = tipo;// Guardamos si es usuario o tienda

                        // Guardar el usuario en localStorage para que persista al recargar la página
            if (tipo === "tienda"){
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.removeItem('cliente')
                setUser(userData); // Guarda el usuario en el estado
                setCliente(null);
            }else if(tipo === "usuario"){
                localStorage.setItem('cliente', JSON.stringify(userData));
                localStorage.removeItem('user')
                setCliente(userData); // Guarda el usuario en el estado
                setUser(null);
            }
            

        } catch (error) {
            throw new Error(error.message); // Manejo de errores
        }
    };

    // Función de cierre de sesión
    const logout = () => {
        setUser(null); // Eliminar el usuario del estado
        localStorage.removeItem('user'); // Eliminar el usuario de localStorage
        setCliente(null);
        localStorage.removeItem('cliente');
    };  

    

    return (
        <AuthContext.Provider value={{ user,cliente, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
