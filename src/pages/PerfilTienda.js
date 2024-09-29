import { Header } from "@/components/Header/Header";

import { SeccionTiendas } from "@/components/BarraCategorias/barraCategorias";

import { PerfilT} from "@/components/PerfilTienda/PerfilT";
import {useFetch} from "@/hook/useFetch";


import { Producto } from "@/components/producto/Producto";


const PerfilTienda = () => {


    const {data, loading, error} = useFetch("http://localhost:8080/Seccion/5");

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
                                    imagen="/udeafood.jpg"
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