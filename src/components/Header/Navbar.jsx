import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useBusquedaContext } from "@/atoms/busquedaContext";
import { useRouter } from 'next/router';
import Link from 'next/link';

const Navbar = () => {
    const [palabra, setPalabra] = useState("");
    const [tipoTienda, setTipoTienda] = useState("TODAS");

    const router = useRouter();
    const { setData } = useBusquedaContext();

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
            setData(productos); // Guardar la respuesta completa en `setData`
            console.log("PRODUCTOS", productos);
            router.push("/busquedaProducto");
        } catch (error) {
            console.error("Error en la búsqueda:", error);
        }
    };

    return (
        <nav classNam
        e='flex flex-[1] justify-between w-full items-center gap-2'>
            <div className="flex bg-gray-200 rounded-full w-full max-w-xl mx-auto py-3">
                <div className="pointer-events-none flex items-center justify-center px-2">
                    <SearchIcon className="text-gray-500" />
                </div>

                {/* Input de Búsqueda */}
                <form onSubmit={buscarProducto} className="flex items-center w-11/12">
                    <InputBase
                        placeholder="Buscar productos..."
                        inputProps={{ 'aria-label': 'search' }}
                        className="pr-2 bg-transparent text-gray-700 focus:outline-none pl-2 w-full"
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
                className="bg-green-500 mr-60 px-5 py-2 h-10 rounded-lg text-xl outline-none w-72"
            >
                <option value="TODAS">TODAS</option>
                <option value="FORMAL">FORMAL</option>
                <option value="INFORMAL">INFORMAL</option>
            </select>

            {/* Botones de Registro e Inicio de Sesión */}
            <Link href="/registro">
                <button className="bg-green-600 text-white font-medium text-xl py-4 px-6 rounded-lg hover:bg-green-500 duration-300">
                    Registrarse
                </button>
            </Link>
            <Link href="/inicioSesion">
                <button className="bg-green-600 text-white font-medium text-xl py-4 px-6 rounded-lg hover:bg-green-500 duration-300">
                    Iniciar sesión
                </button>
            </Link>
        </nav>
    );
};

export { Navbar };
