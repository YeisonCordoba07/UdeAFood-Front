import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import {useBusquedaContext} from "@/atoms/busquedaContext";
import { useRouter } from 'next/router';

const Navbar = () => {

    const [palabra, setPalabra] = useState("");

    const router = useRouter();

    const {setData} = useBusquedaContext();


    const buscarProducto = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/Producto/consultar/${palabra}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },

        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                console.log(response)
                setData(response);
                router.push("/busquedaProducto");

            })
            .catch((error) => {
                //   setError(error);
            }).finally(() => {
                // setLoading(false);
            });

    }



    return (

        <nav className='flex flex-[1] justify-between w-full'>
            <div className="flex bg-gray-200 rounded-full  w-full max-w-xl mx-auto py-0">
                <div className="pointer-events-none flex items-center justify-center px-2">
                    <SearchIcon className="text-gray-500" />
                </div>

                {/* Search Input */}
                <form onSubmit={buscarProducto} className = "flex items-center">

                    <InputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        className="pr-2 bg-transparent text-gray-700 focus:outline-none pl-2"
                        value={palabra}
                        onChange={(e) => setPalabra(e.target.value)}
                    />

                </form>
            </div>

            <button
                type="submit"
                className="bg-green-600 text-white font-medium text-xl py-4 px-6 rounded-lg hover:bg-green-600 hover:scale-95 duration-300">
                Registrarse</button>

            <button
                type="submit"
                className="bg-green-600 text-white font-medium text-xl py-4 px-6 rounded-lg hover:bg-green-600 hover:scale-95 duration-300">
                Iniciar sesión </button>

        </nav>

    )
}

export { Navbar };