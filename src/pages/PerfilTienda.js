import { Header } from "@/components/Header/Header";
import { SeccionTiendas } from "@/components/BarraSecciones/barraSecciones";
import { PerfilT } from "@/components/PerfilTienda/PerfilT";
import { Producto } from "@/components/producto/Producto";
import { useAuth } from "@/context/AuthContext"; 
import { InformacionTienda } from "@/components/PerfilTienda/InformacionTienda";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


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

    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingUser(false);
        }, 1000); // Espera de 1 segundo antes de verificar el valor de user

        return () => clearTimeout(timer); // Limpia el temporizador cuando se termine
    }, []);

    useEffect(() => {
        if (!loadingUser && !user) {
            router.push("/inicioSesion");
        }
    }, [loadingUser, user, router]);


    //const url = user ? localStorage.getItem("user") : null;


    if (!user) {
        return <div>Redirigiendo...</div>;
    }


    // Función para obtener una imagen aleatoria
    const obtenerImagenAleatoria = () => {
        const indiceAleatorio = Math.floor(Math.random() * imagenes.length);
        return imagenes[indiceAleatorio];
    };


    return (

        <div className="relative">
            <Header />

            <SeccionTiendas secciones={user?.secciones || []} />

            <PerfilT tienda={user}/>
            
            <InformacionTienda tienda={user}/>

            <section className="flex flex-col p-5">

                {
                    user?.secciones?.map((secciones) => {
                        return (
                            <section
                                id={secciones.nombre} // Id para identificar la sección en la barra de navegación
                                key={secciones.id} // Key para identificar la sección y desplazarse a ella
                                className="flex flex-col gap-2 pt-5 pb-7 border-b border-gray-200"
                                style={{ scrollMarginTop: '70px' }}>

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