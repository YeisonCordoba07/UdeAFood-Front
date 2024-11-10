import { Header } from "@/components/Header/Header";
import { SeccionTiendas } from "@/components/BarraSecciones/barraSecciones";
import { PerfilT } from "@/components/PerfilTienda/PerfilT";
import { useFetch } from "@/hook/useFetch";
import { Producto } from "@/components/producto/Producto";
import { useAuth } from "@/context/AuthContext"; 
import { InformacionTienda } from "@/components/PerfilTienda/InformacionTienda";
import { useRouter } from 'next/router';
import { useEffect } from 'react';


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

    const { user } = useAuth(); // Obtiene la información del usuario autenticado
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/inicioSesion');
        }
    }, [user, router]);


    const url = user ? `http://localhost:8080/Tienda/${user.id}` : null;

    // Reemplaza esta URL con la URL que te devuelva la tienda correspondiente al usuario
    const { data: tiendaData, loading: tiendaLoading, error: tiendaError } = useFetch(url);

    if (!user) {
        return <div>Redirigiendo...</div>;
    }

    // Si la tienda está cargando o hay un error, puedes manejarlo aquí
    if (tiendaLoading) return <div>Cargando tienda...</div>;
    if (tiendaError) return <div>Error al cargar la tienda: {tiendaError.message}</div>;


    // Función para obtener una imagen aleatoria
    const obtenerImagenAleatoria = () => {
        const indiceAleatorio = Math.floor(Math.random() * imagenes.length);
        return imagenes[indiceAleatorio];
    };


    return (

        <div className="relative">
            <Header />

            <SeccionTiendas secciones={tiendaData?.secciones || []} />

            <PerfilT tienda={tiendaData}/>
            
            <InformacionTienda tienda={tiendaData}/>

            <section className="flex flex-col p-5">

                {
                    tiendaData?.secciones?.map((secciones) => {
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