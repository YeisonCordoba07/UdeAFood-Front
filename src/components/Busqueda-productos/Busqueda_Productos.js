import React from 'react';
import { Header } from '../Header/Header';
import { Categorias } from '../categorias/Categorias';
import { Producto } from '../producto/Producto';
import { useBusquedaContext } from "@/atoms/busquedaContext";
import { useCategoriaContext } from '@/atoms/useCategoriaContext';

const imagenes = [
    "/burrito.jpg",
    "/empanada1.jpg",
    "/hamburguesa.jpg",
    "/pizza2.jpeg",
    "/pizza3.jpeg",
    "/pizza4.jpeg",
    "/pizza5.jpeg",
    "/polloasado.jpeg",
    "/sanduche.jpg",
    "/pasta1.jpeg",
    "/pasta2.jpeg",
    "/bandejapaisa.jpeg",
    "/sopa.jpeg",
    "/arepa.jpeg",
    "/pasaboca1.jpeg",
    "/pasaboca2.jpeg",
    "/cafe1.jpeg",
    "/cafe2.jpeg",
    "/arroz1.jpeg",
    "/arroz2.jpeg",
];


const Busqueda_Productos = () => {


    // Función para obtener una imagen aleatoria
    const obtenerImagenAleatoria = () => {
        const indiceAleatorio = Math.floor(Math.random() * imagenes.length);
        return imagenes[indiceAleatorio];
    };


    const { data } = useBusquedaContext();
    const { categoriaData } = useCategoriaContext();

    console.log("DATA DE BUSQUEDA: ", data);


    return (
        <div>
            <Header />
            <Categorias />
            {/* Carga los productos de la data obtenida de la busqueda en el nav */}
            {data.length > 0 ? (
                <section className="flex gap-4 p-5 flex-wrap">
                    {data.map((seccion) => (
                        seccion.productos.map((producto) => (
                            <Producto
                                key={producto.id}
                                imagen={obtenerImagenAleatoria()}
                                nombre={producto.nombre}
                                precio={producto.precio}
                            />
                        ))
                    ))}
                </section>
            ) : (
                <p className="p-5 text-center">No se encontraron productos por el buscador</p>
            )}


            {/* Carga los productos de la data obtenida de la busqueda en el nav */}
            {categoriaData.length > 0 ? (
                <section className="flex gap-4 p-5 flex-wrap">
                    {categoriaData.map((producto) => (

                        <Producto
                            key={producto.id}
                            imagen={obtenerImagenAleatoria()}
                            nombre={producto.nombre}
                            precio={producto.precio}
                        />

                    ))}
                </section>
            ) : (
                <p className="p-5 text-center">No se encontraron productos por categorias</p>
            )}








            {/*Productos preterminados o quemados*/}
            <section className="flex gap-4 p-5 flex-wrap">
                <Producto
                    imagen="/udeafood.jpg"
                    nombre="Hamburguesa de Pollo"
                    precio="5800" />

                <Producto
                    imagen="/informal.jpg"
                    nombre="Patel de carne hojaldrada horno"
                    precio="4200" />

                <Producto
                    imagen="/formal.jpg"
                    nombre="Patel de carne"
                    precio="4200" />

                <Producto
                    imagen="/formal.jpg"
                    nombre="Patel de carne"
                    precio="4200" />

                <Producto
                    imagen="/formal.jpg"
                    nombre="Patel de carne"
                    precio="4200" />


            </section>

        </div>
    )
}

export { Busqueda_Productos };