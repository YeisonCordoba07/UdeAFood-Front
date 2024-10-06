import React from 'react';
import { useCategoriaContext } from '@/atoms/useCategoriaContext';
import { useRouter } from 'next/router';


const ElementoCategoria = ({textoCategoria}) => {


    const { setCategoriaData } = useCategoriaContext();
    const router = useRouter();


    const buscarProducto = (e) => {
        e.preventDefault();

        console.log("CATEGORIA: ", textoCategoria);
        /* Consultar todos los productos
        "http://localhost:8080/Producto/consultar/"*/
        fetch(`http://localhost:8080/Producto/obtenerTodos/${textoCategoria}`, {
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
                setCategoriaData(response);
                console.log("DATA", response);
                router.push("/busquedaProducto");

            })
            .catch((error) => {
                //   setError(error);
            }).finally(() => {
                // setLoading(false);
            });

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