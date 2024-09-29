import { Header } from "@/components/Header/Header";

import { SeccionTiendas } from "@/components/BarraSecciones/barraSecciones";

import { PerfilT} from "@/components/PerfilTienda/PerfilT";
import {useFetch} from "@/hook/useFetch";

import { Producto } from "@/components/producto/Producto";



// Ruta de imagenes para elegirlas al azar
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



const PerfilTienda = () => {


    const {data, loading, error} = useFetch("http://localhost:8080/Seccion/5");


    // Función para obtener una imagen aleatoria
    const obtenerImagenAleatoria = () => {
        const indiceAleatorio = Math.floor(Math.random() * imagenes.length);
        return imagenes[indiceAleatorio];
    };


    return (

        <div>
            <Header />

            <SeccionTiendas/>

            <PerfilT/>
            

            <section className="flex gap-4 p-5 flex-wrap">

                {
                    data.map((secciones) => {
                        return secciones.productos.map((elementoProducto) => {
                            return (
                                <Producto
                                    key={elementoProducto.id}
                                    imagen={obtenerImagenAleatoria()}
                                    nombre={elementoProducto.nombre}
                                    precio={elementoProducto.precio}
                                />
                            );
                        });
                    })

                }

                <Producto />

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
            </section>

        </div>

    );
}


export default PerfilTienda;