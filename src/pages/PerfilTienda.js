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


    const {data, loading, error} = useFetch("http://localhost:8080/Seccion/1");


    // Función para obtener una imagen aleatoria
    const obtenerImagenAleatoria = () => {
        const indiceAleatorio = Math.floor(Math.random() * imagenes.length);
        return imagenes[indiceAleatorio];
    };


    return (

        <div className="relative">
            <Header />

            <SeccionTiendas secciones={data}/>

            <PerfilT/>
            

            <section className="flex flex-col p-5">

                {
                    data.map((secciones) => {
                        return (
                            <section
                                id={secciones.nombre}
                                key={secciones.nombre}
                                className="flex flex-col gap-2 pt-5 pb-7 border-b border-gray-200">

                                <h2 className={"text-2xl font-bold"}>{secciones.nombre}</h2>
                                <div className="flex gap-4 mt-2 flex-wrap">
                                {secciones.productos.map((elementoProducto) => {
                                    return (
                                        <Producto
                                            key={elementoProducto.id}
                                            imagen={obtenerImagenAleatoria()}
                                            nombre={elementoProducto.nombre}
                                            precio={elementoProducto.precio}
                                        />
                                    );
                                })}
                                </div>
                            </section>
                        );
                    })

                }


            </section>

        </div>

    );
}


export default PerfilTienda;