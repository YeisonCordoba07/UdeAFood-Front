import React, {useState} from 'react'
import {useBusquedaContext} from "@/atoms/busquedaContext";
import {Producto} from "@/components/producto/Producto";
import {Header} from "@/components/Header/Header";
import {Categorias} from "@/components/categorias/Categorias";

const BusquedaProducto = () => {
    const {data} = useBusquedaContext();

    const [sortField, setSortField] = useState('nombre'); // 'nombre' o 'precio'
    const [ascending, setAscending] = useState(true); // Ascendente o descendente
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);



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
        <>
            <Header/>
            <Categorias/>

            {/* Selectores para ordenar */}
            <div className="p-3 text-center space-x-4 flex items-center justify-center border-b border-neutral-200">
                <label className="text-gray-700 font-semibold mr-2">Ordenar por:</label>
                <select
                    onChange={(e) => {
                        setSortField(e.target.value);
                    }}
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
            {sortedData.length > 0 ?
                (<section className="flex justify-start w-full max-w-[1270px] gap-4 py-5 flex-wrap m-auto">
                    {sortedData.map((producto) => (
                        <Producto
                            key={producto.id}
                            producto={producto}
                        />
                    ))}
                </section>)
                :
                (<p className="p-5 text-center">No se encontraron productos</p>)
            }

        </>
    );
}


export default BusquedaProducto;