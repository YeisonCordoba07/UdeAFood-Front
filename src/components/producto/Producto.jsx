import { BotonConIcono } from "../Botones/BotonConIcono";
import Image from "next/image";



import AllReviews from "@/components/ratings/AllReviews";


import { useEffect, useRef, useState } from "react";
import { ElementoCategoria } from "../categorias/ElementoCategoria";
import { BotonEliminar } from "@/components/Botones/BotonEliminar";
import { BotonActualizar } from "@/components/Botones/BotonActualizar";
import { useAuth } from "@/context/AuthContext";
import { useCarrito } from "@/hook/useCarrito";
import { elegirImagen } from "@/lib/elegirImagen";
import { IconoCarrito } from "../iconos/IconoCarrito";



const Producto = ({ producto, idTienda, onDeleteProducto }) => {
    const { user } = useAuth();
    const [puedeEditar, setPuedeEditar] = useState(false);
    const menuRef = useRef(null);
    const { agregarAlCarrito } = useCarrito();

    {/* ver todas las reviews */ }
    const [verTodasLasResenas, setVerTodasLasResenas] = useState(false);

    {/* detalles y opciones ocultas del producto */
    }
    const [mostrarDetalles, setMostrarDetalles] = useState(false);
    const [mostrarMenuOpciones, setMostrarMenuOpciones] = useState(false);
    const [calificaciones, setCalificaciones] = useState([]);


    {/* Verificar que solo el usuario pueda editar */
    }
    useEffect(() => {
        if (user === null || !idTienda) return;
        if (parseInt(user?.id) === parseInt(idTienda)) {
            setPuedeEditar(true);
        }

    }, [idTienda, user]);


    {/* Cerrar el menu de opciones al hacer click fuera de el */
    }
    useEffect(() => {
        const handleClickFuera = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMostrarMenuOpciones(false);
            }
        };

        document.addEventListener("mousedown", handleClickFuera);
        return () => {
            document.removeEventListener("mousedown", handleClickFuera);
        };
    }, []);


    useEffect(()=>{
        const fetchCalificaciones = async () => {
            try {
                if (!producto || !producto.id) {
                    console.error("Producto no válido o sin ID");
                    return;
                }
                const response = await fetch(`http://localhost:8080/calificacion/${producto.id}`);
                if (!response.ok) {
                    throw new Error("Error al obtener las calificaciones");
                }
                const data = await response.json();
                setCalificaciones(data);
                console.log("Calificaciones obtenidas:", data);
            } catch (error) {
                console.error("Error al obtener las calificaciones:", error);
            }
        };
        if(verTodasLasResenas){

            fetchCalificaciones();
        }


    }, [producto, verTodasLasResenas]);





    function handleMostrarDetalles(e) {
        e.stopPropagation();
        setMostrarDetalles((prev) => {
            return !prev
        });
    }

    {/* reseñas simuladas */ }
    const reseñas = [
        { 
            idUsuario: 1, 
            nombreUsuario: "Laura", 
            calificacion: 4, 
            comentario: "Muy buena, aunque un poco fría." 
        },
        { 
            idUsuario: 2, 
            nombreUsuario: "Carlos", 
            calificacion: 5, 
            comentario: "Perfecta, la recomiendo mucho." 
        },
        { 
            idUsuario: 3, 
            nombreUsuario: "María", 
            calificacion: 4, 
            comentario: "Buen sabor, pero poca cantidad." 
        },
        { 
            idUsuario: 4, 
            nombreUsuario: "Luis", 
            calificacion: 3, 
            comentario: "Regular, estaba un poco salada." 
        },
        { 
            idUsuario: 5, 
            nombreUsuario: "Ana", 
            calificacion: 5, 
            comentario: "Excelente sabor y porción." 
        },
    ];


    return (
        <>
            <div
                className="flex flex-col w-[290px] h-[380px] p-4 border border-gray-100 rounded-lg font-bold gap-4 items-start shadow-lg group relative"
            >

                <Image
                    src={elegirImagen(producto)} alt={""}
                    width={300}
                    height={300}

                    onClick={(e) => handleMostrarDetalles(e)}
                    className="bg-no-repeat max-w-[250px] min-h-[200px] max-h-64 object-cover rounded-md mx-auto cursor-pointer" />



                <div className="flex gap-1 flex-col w-full">

                    <span className="text-xl overflow-hidden text-ellipsis whitespace-nowrap w-full">{producto?.nombre}</span>

                    <span className="text-2xl  overflow-hidden text-ellipsis whitespace-nowrap">$ {producto?.precio}</span>

                </div>



                <BotonConIcono icono={<IconoCarrito />} textoBoton="Agregar" onClick={e => agregarAlCarrito(producto)} />



                {/* Menu de opciones (eliminar, actualizar) */}
                {puedeEditar &&
                    <div
                        ref={menuRef}
                        className={`absolute top-2 right-2 gap-2 
                  group-hover:flex group-hover:flex-col items-end ${mostrarMenuOpciones ? "flex flex-col" : "hidden"}`}>
                        <button
                            className={"flex rounded-full bg-gray-300 hover:bg-gray-400 w-10 h-10 items-center justify-center"}
                            onClick={() => setMostrarMenuOpciones((prev) => {
                                return !prev
                            })}

                        >
                            {/* Icono de 3 puntos */}
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round" strokeLinejoin="round" className="icon-tabler icon-tabler-dots-vertical">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <circle cx="12" cy="5" r="1" />
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="12" cy="19" r="1" />
                            </svg>
                        </button>


                        {mostrarMenuOpciones &&
                            <div

                                className={"flex flex-col gap-2 bg-white p-3 rounded-md shadow-lg border border-gray-200"}>

                                <BotonEliminar
                                    productoId={producto.id}
                                    onDeleteSuccess={onDeleteProducto} />
                                <BotonActualizar enlace={`/CrearProducto?id=${producto.id}`} />

                            </div>
                        }

                    </div>
                }

            </div>




            {/* Detalles del producto */}
            {mostrarDetalles &&
                <div
                    className="fixed w-screen h-screen bg-black bg-opacity-60 z-50 flex justify-center items-center top-0 right-0"
                    onClick={(e) => handleMostrarDetalles(e)}>


                    <div
                        onClick={(e) => {
                            e.stopPropagation(); // Evita que el clic cierre el diálogo
                        }}
                        className="bg-white relative rounded-lg w-fit h-[90vh] flex flex-col items-center justify-center overflow-hidden"
                    >



                        <div
                            className="w-[800px] bg-white rounded-md overflow-y-auto flex gap-5 p-7"

                        >
                            {/* Imagen y categorias */}
                            <div className="flex flex-col gap-4 w-7/12">
                                <Image
                                    src={elegirImagen(producto)} alt={producto?.nombre}
                                    width={300}
                                    height={300}
                                    className="bg-no-repeat w-full h-fit object-cover rounded-md"
                                />
                                {/* calificacion promedio de las estrellas */}
                                <div className="text-sm text-yellow-500 mt-1">★ 4.6 · 7.498 calificaciones</div>

                                {/* Comentarios en el frontent estaticos de los 3 ultimos comentarios */}
                                <div className="mt-4">
                                    <h4 className="text-lg font-semibold mb-2">Últimas reseñas</h4>
                                    {
                                        calificaciones.map((calificacion, index) => {
                                            return (
                                                <div key={index} className="border-t pt-2">
                                                    <p className="text-sm font-medium text-gray-700">{calificacion.nombreUsuario}</p>
                                                    <p className="text-yellow-500">{"★".repeat(calificacion.calificacion)}{"☆".repeat(5 - calificacion.calificacion)}</p>
                                                    <p className="text-gray-600">{calificacion.comentario}</p>
                                                </div>
                                            );
                                        })
                                    }
                                    {
                                        calificaciones.length <=0 && (<div className="space-y-2">
                                        <div className="border-t pt-2">
                                            <p className="text-sm font-medium text-gray-700">Laura</p>
                                            <p className="text-yellow-500">★★★★☆</p>
                                            <p className="text-gray-600">Muy buena, aunque un poco fría.</p>
                                        </div>
                                        <div className="border-t pt-2">
                                            <p className="text-sm font-medium text-gray-700">Carlos</p>
                                            <p className="text-yellow-500">★★★★★</p>
                                            <p className="text-gray-600">Perfecta, la recomiendo mucho.</p>
                                        </div>
                                        <div className="border-t pt-2">
                                            <p className="text-sm font-medium text-gray-700">María</p>
                                            <p className="text-yellow-500">★★★★☆</p>
                                            <p className="text-gray-600">Buen sabor, pero poca cantidad.</p>
                                        </div>
                                    </div>)
                                    }
                                    <button
                                        className="mt-4 mb-10 px-4 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                                        onClick={() => setVerTodasLasResenas(true)}
                                    >
                                        Ver más comentarios
                                    </button>
                                </div>

                                <AllReviews
                                    isOpen={verTodasLasResenas}
                                    onClose={() => setVerTodasLasResenas(false)}
                                    reviews={calificaciones.length > 0 ? calificaciones : reseñas}
                                    productId={producto.id}
                                />



                                {/* Categorias del producto */}
                                <div className="flex flex-wrap gap-2 w-full">

                                    {producto.categorias && producto.categorias.length > 0 && producto.categorias.map((categoria) => {

                                        return (
                                            <div key={categoria.idCategoria} onClick={(e) => {
                                                handleMostrarDetalles(e)
                                            }}>

                                                <ElementoCategoria
                                                    key={categoria.idCategoria}
                                                    textoCategoria={categoria.nombreCategoria}
                                                />
                                            </div>

                                        );
                                    })}
                                </div>


                            </div>

                            {/* Information of the product */}
                            <div className="flex flex-col gap-2 w-5/12">
                                <div>
                                    <span className="font-bold text-2xl">{producto.nombre}</span>
                                    <div>

                                        <p className="text-gray-400 text-lg font-bold">${producto.precio}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-500">{producto.descripcion}</p>
                                </div>

                            </div>

                        </div>
                        {/* Buttons */}
                        <div className="w-full flex justify-end p-5 border-t border-t-gray-300 items-center rounded-b-md">
                            <div className="flex gap-5">

                                <BotonConIcono textoBoton="Agregar a carrito" icono={<IconoCarrito />} />


                            </div>
                        </div>

                        {/* Icono para cerrar */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={30}
                            height={30}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={3}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-700 transition duration-1
                500 ease-in-out hover:bg-gray-200 rounded-full p-1 hover:scale-110"
                            onClick={(e) => handleMostrarDetalles(e)}
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M18 6l-12 12" />
                            <path d="M6 6l12 12" />
                        </svg>
                    </div>

                </div>
            }

        </>

    );
}


export { Producto };