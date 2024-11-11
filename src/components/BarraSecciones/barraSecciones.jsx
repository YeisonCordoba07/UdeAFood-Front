import React, { useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Importa el icono de lupa desde react-icons
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import {BotonFlechaCategoria} from "@/components/categorias/BotonFlechaCategoria";
import Link from "next/link";

const seccionesProvicinales = [
    'Pizza', 'Asiática', 'Poke', 'Empanadas', 'Sushi', 'Sanduches', 'Típica', 'Vegana',
    'Pollo', 'Jugos', 'Desayuno', 'Hamburguesas', 'Perros', 'Mexicana', 'Café',
    'Panadería', 'Japonesa', 'China', 'Alcohol', 'Ensaladas'
];



const SeccionTiendas = ({secciones}) => {


    const [seccionActiva, setSeccionActiva] = useState();
    const seccionScrollRef = useRef(null);



    const scrollLeft = () => {
        seccionScrollRef.current.scrollBy({ left: -150, behavior: 'smooth' });
    };

    const scrollRight = () => {
        seccionScrollRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    };



    return (
        <div className="bg-gray-100 sticky top-0 z-10">
            <div className="p-4 mb-4 flex items-center justify-between">
                <div className="flex items-center w-full max-w-[65%]">
                    <h2 className="text-lg font-bold mr-4">Secciones</h2>


                    <div className="flex space-x-4 overflow-x-hidden border-l-2 border-r-2 bg-white rounded-md items-center" ref={seccionScrollRef}>
                        {secciones.map((seccion) => (
                            <Link href={`#${seccion.nombre}`}
                                key={seccion.nombre}
                                className={`px-4 py-2 text-black ${seccionActiva === seccion.nombre ? 'text-green-500 font-bold' : ''} whitespace-nowrap`}
                                onClick={() => setSeccionActiva(seccion.nombre)}>

                                    {seccion.nombre}
                                    {seccionActiva === seccion.nombre && (<div className="w-full h-1 bg-green-500 mt-1"></div>)}

                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex items-center space-x-2">

                    <BotonFlechaCategoria onClick={scrollLeft} icono={<MdArrowBackIosNew/>} />

                    <BotonFlechaCategoria onClick={scrollRight} icono={<MdArrowForwardIos/>}/>

                    <div className="relative ml-4">
                        <input
                            type="text"
                            placeholder="Buscar dentro de la tienda"
                            className="rounded-full bg-gray-100 py-2 px-4 text-gray-600 w-64 outline-none focus:bg-white shadow-md"
                        />
                        <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export { SeccionTiendas };
