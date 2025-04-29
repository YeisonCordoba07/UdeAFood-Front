import { BotonConIcono } from "@/components/Botones/BotonConIcono";
import { Header } from "@/components/Header/Header";
import { useCarrito } from "@/hook/useCarrito";
import { elegirImagen } from "@/lib/elegirImagen";
import Image from "next/image";

import { useEffect, useState } from "react";

export default function Carrito() {


    const { carrito, quitarDelCarrito, vaciarCarrito } = useCarrito();

    const [precioTotal, setPrecioTotal] = useState(0);

    useEffect(() => {

        setPrecioTotal(carrito.reduce((total, item) => item.precio + total, 0));
    }, [carrito])

    return (

        <>
                    <Header/>
            <div className="w-full h-full bg-zinc-300 flex justify-center">
                <div className="w-[1200px] h-full p-7 bg-zinc-300 flex gap-5">

                    {/* Productos */}
                    <div className="flex flex-col rounded-md w-full bg-gray-100 shadow-md border border-zinc-200">

                        <h2 className="text-2xl font-bold p-5 ">Productos</h2>
                        <hr className="border border-neutral-200 w-full" />

                        <div className="flex flex-col gap-5 p-5">

                            {carrito.map((producto) => {
                                return (
                                    <div
                                        key={producto.id}
                                        className={"flex p-4 rounded-lg font-bold gap-4 shadow-md  hover:shadow-xl transition-transform duration-200 ease-in-out h-[200px] w-full border border-gray-200 bg-white"}>


                                        <Image src={elegirImagen(producto)} alt={producto.nombre} width={300} height={300}
                                            className="bg-no-repeat h-full min-h-[100px] object-cover rounded-md mx-auto w-1/4" />



                                        <div className="flex gap-1 flex-col w-full max-sm:text-center">
                                            <span
                                                className="text-xl overflow-hidden text-ellipsis w-full">
                                                {producto.nombre}
                                            </span>

                                            <p
                                                className="text-sm font-normal text-neutral-400 overflow-hidden text-ellipsis  w-full">
                                                {producto.descripcion}
                                            </p>

                                        </div>



                                        <div className="flex flex-col w-1/3 max-sm:w-full">
                                            <div className="flex items-center gap-2">

                                                <span className="text-2xl font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                                                    $ {producto.precio}
                                                </span>
                                                <span className="bg-lime-500  rounded-md text-center w-fit px-2 py-[2px] text-white ">-12%</span>

                                            </div>

                                            <small className="text-lg text-neutral-400 line-through overflow-hidden text-ellipsis whitespace-nowrap">
                                                $ {producto.precio}
                                            </small>

                                            <div className={"mt-auto w-full"}>

                                                <BotonConIcono textoBoton="Elimiar" onClick={() => quitarDelCarrito(producto.id)} />
                                            </div>

                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                        <hr className="border border-neutral-200 w-full" />
                        <div className="p-5 flex items-center justify-between">
                            <div>
                                <BotonConIcono textoBoton="Vaciar carrito" onClick={vaciarCarrito} />
                            </div>

                            <div className="flex justify-end gap-5">
                                <span className="font-bold text-xl">Subtotal:</span>
                                <span className="font-bold text-xl">$ {precioTotal}</span>
                            </div>
                        </div>


                    </div>



                    {/* Pago */}
                    <div className="flex bg-gray-100 w-[500px] min-w-96 h-fit rounded-md flex-col shadow-md border border-zinc-200">

                        <h2 className="text-2xl font-bold p-5 ">Pago</h2>
                        <hr className="border border-neutral-200 w-full" />

                        <div className="flex flex-col p-5 gap-2">

                            <div className="flex justify-between ">
                                <span className=" text-xl">Cantidad de productos:</span>
                                <span className="text-xl">{carrito.length}</span>
                            </div>

                            <div className="flex justify-between ">
                                <span className=" text-xl">Descuento:</span>
                                <span className="text-xl">0</span>
                            </div>



                            <div className="flex justify-between ">
                                <span className=" text-xl">Envio:</span>
                                <span className="text-xl">$ 0</span>
                            </div>

                            <div className="flex justify-between ">
                                <span className="font-bold text-xl">Total:</span>
                                <span className="font-bold text-xl">$ {precioTotal}</span>
                            </div>

                        </div>

                        <hr className="border border-neutral-200 w-full" />

                        <div className="p-5">

                            <BotonConIcono textoBoton="Comprar" />
                        </div>

                    </div>

                </div>
            </div>
        </>


    );
}