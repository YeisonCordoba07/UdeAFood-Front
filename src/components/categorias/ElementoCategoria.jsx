import React from 'react';
import { useRouter } from 'next/router';
import { useBusquedaContext } from '@/atoms/busquedaContext';


const ElementoCategoria = ({textoCategoria}) => {


    const { setData } = useBusquedaContext();
    const router = useRouter();


    const buscarProducto = async (e) => {
        e.preventDefault();
        console.log("CATEGORIA: ", textoCategoria);

        try {
            const response = await fetch(`http://localhost:8080/Producto/obtenerTodos/${textoCategoria}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }

            const data = await response.json();
            setData(data);
            
            console.log("DATA", data);
            router.push("/busquedaProducto");

        } catch (error) {
            console.error("Error al buscar productos:", error);

        }
    }




    return (
            <button 
            onClick={buscarProducto}
            className="bg-zinc-200 hover:bg-lime-300 py-2 px-4 text-zinc-700 hover:text-zinc-800 rounded-full duration-300">
                {textoCategoria}
            </button>
    );
};

export {ElementoCategoria};