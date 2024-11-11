import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useBusquedaContext } from "@/atoms/busquedaContext";


const Tienda = () => {
    const { setData } = useBusquedaContext();

    return (
        <div className="w-full h-3/5 flex items-center justify-center p-5">
            <div className="grid grid-cols-3 gap-4 w-[1200px] h-60">

                {/* Reemplaza a BusquedaTFormales */}
                <Link href='/BuscarTienda'>
                    <button
                        className="relative flex flex-col items-center justify-center w-full h-full bg-gray-100 shadow-lg transition-colors duration-300 ease-in-out hover:bg-gray-200 rounded-lg hover:brightness-110"
                        onClick={()=>{
                            setData('FORMAL');
                            localStorage.setItem("tipo-tienda", "FORMAL");
                        }}
                    >
                        <Image src="/Formales.png" alt="Ver tiendas formales"
                            fill={true} />

                        <div className="absolute bottom-0 w-full text-center bg-gradient-to-t from-gray-900 to-transparent text-white p-2 rounded-b-lg flex flex-col items-start">

                            <p className="text-3xl font-black text-start">
                                <small className="text-2xl">
                                    Ver
                                </small><br />tiendas formales
                            </p>

                        </div>

                    </button>
                </Link>

                {/* Reemplaza a BusquedaTInformales */}
                <Link href='/BuscarTienda'>
                    <button
                        className="relative flex flex-col items-center justify-center w-full h-full bg-gray-100 shadow-lg transition-colors duration-300 ease-in-out hover:bg-gray-200 hover:brightness-110"
                        onClick={()=>{
                            setData('INFORMAL');
                            localStorage.setItem("tipo-tienda", "INFORMAL");
                        }}
                    >

                        <Image src="/Informales.png" alt="Ver tiendas formales"
                            fill={true} />

                        <div className="absolute bottom-0 w-full text-center bg-gradient-to-t from-gray-900 to-transparent text-white p-2 rounded-b-lg flex flex-col items-start">

                            <p className="text-3xl font-black text-start">
                                <small className="text-2xl">
                                    Ver
                                </small><br />todas informales
                            </p>

                        </div>
                    </button>
                </Link>

                {/* Reemplaza a BusquedaTodasTiendas */}
                <Link href='/BuscarTienda'>
                    <button
                        className="relative flex flex-col items-center justify-center w-full h-full bg-gray-100 shadow-lg transition-colors duration-300 ease-in-out hover:bg-gray-200 hover:brightness-110"
                        onClick={()=>{
                            setData('TODAS');
                            localStorage.setItem("tipo-tienda", "TODAS");
                        }}
                    >

                        <Image src="/Todas.png" alt="Ver tiendas formales"
                            fill={true} />

                        <div className="absolute bottom-0 w-full text-center bg-gradient-to-t from-gray-900 to-transparent text-white p-2 rounded-b-lg flex flex-col items-start">

                            <p className="text-3xl font-black text-start">
                                <small className="text-2xl">
                                    Ver
                                </small><br />todas
                            </p>

                        </div>
                    </button>
                </Link>
            </div>

        </div>

    );
};

export { Tienda };
