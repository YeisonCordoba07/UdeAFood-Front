import React, { useState } from 'react';
import { Header } from '../Header/Header';
import { Categorias } from '../categorias/Categorias';
import { Producto } from '../producto/Producto';
import { useBusquedaContext } from "@/atoms/busquedaContext";


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

    const { data } = useBusquedaContext();

    const [sortField, setSortField] = useState('nombre'); // 'nombre' o 'precio'
    const [ascending, setAscending] = useState(true); // Ascendente o descendente




    // Función para obtener una imagen aleatoria
    const obtenerImagenAleatoria = () => {
        const indiceAleatorio = Math.floor(Math.random() * imagenes.length);
        return imagenes[indiceAleatorio];
    };


    const crearTarjetaProductos = (productos) => {

        if (productos.length > 0) {
            return (

                <section className="flex gap-4 p-5 flex-wrap">
                    {productos.map((producto) => (
                        <Producto
                            key={producto.id}
                            imagen={producto.foto ? `data:image/png;base64,${producto.foto}` : obtenerImagenAleatoria()}
                            nombre={producto.nombre}
                            precio={producto.precio}
                        />
                    ))}
                </section>
            )
        } else {
            return (

                <p className="p-5 text-center">No se encontraron productos ||</p>
            )
        }
    }


    // Función para ordenar los productos
    const sortProducts = (products) => {
        if (!Array.isArray(products) || products.length === 0) {
            return [];
        }

        return [...products].sort((a, b) => {
            if (a[sortField] < b[sortField]) return ascending ? -1 : 1;
            if (a[sortField] > b[sortField]) return ascending ? 1 : -1;
            return 0;
        });
    };


    const sortedData = sortProducts(data);




    return (
        <div>
            <Header />
            <Categorias />

            {/* Selectores para ordenar */}
            <div className="p-3 text-center space-x-4 flex items-center justify-center border-b border-neutral-200">
                <label className="text-gray-700 font-semibold mr-2">Ordenar por:</label>
                <select
                    onChange={(e) => { setSortField(e.target.value); console.log("datos", data); }}
                    className="bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="nombre">Nombre</option>
                    <option value="precio">Precio</option>
                </select>

                <label className="text-gray-700 font-semibold mx-4">Orden:</label>
                <select
                    onChange={(e) => setAscending(e.target.value === 'ascendente')}
                    className="bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="ascendente">Ascendente</option>
                    <option value="descendente">Descendente</option>
                </select>
            </div>



            {/* Carga los productos de la data obtenida de la búsqueda */}
            {crearTarjetaProductos(sortedData)}





            {/* Productos preterminados o quemados */}
            <section className="flex gap-4 p-5 flex-wrap">
                <Producto imagen="/udeafood.jpg" nombre="Hamburguesa de Pollo" precio="5800" />
                <Producto imagen="/informal.jpg" nombre="Patel de carne hojaldrada horno" precio="4200" />
                <Producto imagen="/formal.jpg" nombre="Patel de carne" precio="4200" />
            </section>
        </div>
    );
};

export { Busqueda_Productos };
