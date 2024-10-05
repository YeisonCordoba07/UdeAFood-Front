import React, { useState } from 'react'
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




    const buscarProducto = (e) => {
        e.preventDefault();

        /* Consultar todos los productos
        "http://localhost:8080/Producto/consultar/"*/
        fetch(`http://localhost:8080/Seccion/tipo/${tipoTienda}/${palabra}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },

        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                //console.log(response)
                setData(response);
                console.log("DATA", response.productos);
                router.push("/busquedaProducto");

            })
            .catch((error) => {
                //   setError(error);
            }).finally(() => {
                // setLoading(false);
            });

    }




    return (
        <nav className='flex flex-[1] justify-between w-full items-center'>
            <div className="flex bg-gray-200 rounded-full  w-full max-w-xl mx-auto py-3 ">
                <div className="pointer-events-none flex items-center justify-center px-2">
                    <SearchIcon className="text-gray-500" />
                </div>

                {/* Search Input */}
                <form onSubmit={buscarProducto} className="flex items-center">
                    <InputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        className="pr-2 bg-transparent text-gray-700 focus:outline-none pl-2"
                        value={palabra}
                        onChange={(e) => setPalabra(e.target.value)}
                    />
                </form>
            </div>

            <select
                id="ID"
                name="tipoTienda"
                value={tipoTienda}
                onChange={(e) => {
                    setTipoTienda(e.target.value);
                    console.log("SELECTED",e.target.value);
                }}
                className="bg-green-500 mr-60 px-5 py-2 h-10 rounded-lg text-xl outline-brack w-72">
                {/*<option disabled value="">
                    Seleccione
                </option>*/}
                <option key="TODAS" value="TODAS">
                    TODAS
                </option>
                <option key="FORMAL" value="FORMAL">
                    FORMAL
                </option>
                <option key="INFORMAL" value="INFORMAL">
                    INFORMAL
                </option>

            </select>

            <Link href="/registro">
                <button
                    type="submit"
                    className="bg-green-600 text-white font-medium text-xl py-4 px-6 rounded-lg hover:bg-green-600 hover:scale-95 duration-300">
                    Registrarse
                </button>
            </Link>
            <Link href="/inicioSesion">
                <button
                    type="submit"
                    className="bg-green-600 text-white font-medium text-xl py-4 px-6 rounded-lg hover:bg-green-600 hover:scale-95 duration-300">
                    Iniciar sesión
                </button>
            </Link>
        </nav>
    );
}

export { Navbar };