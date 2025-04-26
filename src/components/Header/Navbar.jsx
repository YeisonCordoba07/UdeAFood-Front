import React, { useState } from 'react';

// Iconos
import SearchIcon from '@mui/icons-material/Search';
import StoreIcon from '@mui/icons-material/Store';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

import InputBase from '@mui/material/InputBase';

import { useBusquedaContext } from "@/atoms/busquedaContext";
import { useAuth } from "@/context/AuthContext"; // Importamos el contexto de autenticación
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Logo } from './Logo';



const Navbar = () => {
    const [palabra, setPalabra] = useState("");
    const [tipoTienda, setTipoTienda] = useState("TODAS");
    const router = useRouter();
    const { setData } = useBusquedaContext();
    const { user, logout, cliente } = useAuth(); // Obtenemos el usuario y la función de logout

    const buscarProducto = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/Seccion/tipo/${tipoTienda}/${palabra}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) throw new Error("Error en la búsqueda");

            const data = await response.json();
            const productos = data.reduce((acc, seccion) => {
                if (seccion.productos && Array.isArray(seccion.productos)) {
                    return [...acc, ...seccion.productos];
                }
                return acc;
            }, []);
            setData(productos);
            router.push("/busquedaProducto");
        } catch (error) {
            console.error("Error en la búsqueda:", error);
        }
    };

    return (
        <nav className='flex justify-between w-screen items-center gap-5'>
            <Logo />

            <div className="flex gap-8 items-center w-3/5 m-auto">
                {/* Buscador */}
                <div className="flex bg-gray-100 rounded-full w-full max-w-2xl p-3 max-h-12">
                    <div className="pointer-events-none flex items-center justify-center px-2">
                        <SearchIcon className="text-gray-500" />
                    </div>
                    <form onSubmit={buscarProducto} className="flex items-center w-11/12 max-h-10 p-3">
                        <InputBase
                            placeholder="Buscar productos..."
                            inputProps={{ 'aria-label': 'search' }}
                            className="pr-2 bg-transparent text-gray-700 focus:outline-none pl-2 w-full text-xl"
                            value={palabra}
                            onChange={(e) => setPalabra(e.target.value)}
                        />
                    </form>
                </div>

                {/* Selector de Tipo de Tienda */}
                <select
                    id="tipoTienda"
                    name="tipoTienda"
                    value={tipoTienda}
                    onChange={(e) => setTipoTienda(e.target.value)}
                    className="bg-green-500 px-5 h-10 rounded-lg text-xl outline-none w-48 flex align-center"
                >
                    <option value="TODAS">TODAS</option>
                    <option value="FORMAL">FORMAL</option>
                    <option value="INFORMAL">INFORMAL</option>
                </select>
            </div>

            {/* Botones de sesión */}
            <div className="flex items-center gap-5 h-full">
                {user && (
                    <>
                        <Link href="/CrearSeccion">
                            <button className="bg-green-600 text-white font-medium text-xl py-4 px-6 rounded-lg hover:bg-green-500 duration-300 whitespace-nowrap flex flex-col items-center">
                                <BookmarkAddIcon fontSize="large" />
  
                            </button>
                        </Link>
                        <Link href="/CrearProducto">
                            <button className="bg-green-600 text-white font-medium text-xl py-4 px-6 rounded-lg hover:bg-green-500 duration-300 whitespace-nowrap flex flex-col items-center">
                                <AddCircleIcon fontSize="large" />
  
                            </button>
                        </Link>
                        <Link href={`/tienda/${user.id}`}>
                            <button className="bg-green-600 text-white font-medium text-xl py-4 px-6 rounded-lg hover:bg-green-500 duration-300 whitespace-nowrap flex flex-col items-center">
                                <StoreIcon fontSize='large' />

                            </button>
                        </Link>

                        <button onClick={logout} className="bg-green-600 text-white font-medium text-xl py-4 px-6 rounded-lg hover:bg-green-500 duration-300 whitespace-nowrap flex flex-col items-center">
                            <LogoutIcon fontSize="large" />

                        </button>
                    </>
                ) }
                {cliente && (

                    <button onClick={logout} className="bg-green-600 text-white font-medium text-xl py-4 px-6 rounded-lg hover:bg-green-500 duration-300 whitespace-nowrap flex flex-col items-center">
                    <LogoutIcon fontSize="large" />

                    </button>
                )}
                {!user && !cliente && (
                    <>
                    <Link href="/registro">
                        <button className="bg-green-600 text-white font-medium text-xl py-4 px-6 rounded-lg hover:bg-green-500 duration-300 whitespace-nowrap">
                            Registrarse
                        </button>
                    </Link>
                    <Link href="/inicioSesion">
                        <button className="bg-green-600 text-white font-medium text-xl py-4 px-6 rounded-lg hover:bg-green-500 duration-300 whitespace-nowrap border-2 border-white">
                            Iniciar sesión
                        </button>
                    </Link>
                </>
                )

                }
            </div>
  
        </nav>
    );
};

export { Navbar };

