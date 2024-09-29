import React, { useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Importa el icono de lupa desde react-icons
import {useFetch} from "@/hook/useFetch";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import {BotonFlechaCategoria} from "@/components/categorias/BotonFlechaCategoria";

const categories = [
    'Pizza', 'Asiática', 'Poke', 'Empanadas', 'Sushi', 'Sanduches', 'Típica', 'Vegana',
    'Pollo', 'Jugos', 'Desayuno', 'Hamburguesas', 'Perros', 'Mexicana', 'Café',
    'Panadería', 'Japonesa', 'China', 'Alcohol', 'Ensaladas'
];

const SeccionTiendas = () => {

    const {data} = useFetch("http://localhost:8080/Seccion/1");

    const [activeCategory, setActiveCategory] = useState();
    const categoryScrollRef = useRef(null);

    const scrollLeft = () => {
        categoryScrollRef.current.scrollBy({ left: -150, behavior: 'smooth' });
    };

    const scrollRight = () => {
        categoryScrollRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    };



    return (
        <div className="bg-gray-100">
            <div className="p-4 mb-4 flex items-center justify-between">
                <div className="flex items-center w-full max-w-[65%]">
                    <h2 className="text-lg font-bold mr-4">Secciones</h2>

                    {/* Barra de categorias */}
                    <div className="flex space-x-4 overflow-x-hidden" ref={categoryScrollRef}>
                        {data.map((seccion) => (
                            <button
                                key={seccion.nombre}
                                className={`px-4 py-2 text-black ${activeCategory === seccion.nombre ? 'text-green-500 font-bold' : ''}`}
                                onClick={() => setActiveCategory(seccion.nombre)}
                            >
                                {seccion.nombre}
                                {activeCategory === seccion.nombre && (
                                    <div className="w-full h-1 bg-green-500 mt-1"></div>
                                )}
                            </button>
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
