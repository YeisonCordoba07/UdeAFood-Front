import React, { useState } from 'react';
import Link from 'next/link';
const Tienda = () => {

    const [openTiendaDialog, setOpenTiendaDialog] = useState(false);

    return (
        <div className="h-96 flex items-center justify-center">
            <div className="w-full  flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4 w-1/2">

                    <Link href='/BusquedaTiendaF'>
                        <button
                            className="relative flex flex-col items-center justify-center w-full h-full bg-gray-100 shadow-lg transition-colors duration-300 ease-in-out hover:bg-gray-200"
                            onClick={() => console.log('Ver tiendas formales')}
                        >
                            <img src="formal.jpg" alt="Ver tiendas formales" className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 w-full text-center bg-gradient-to-t from-gray-900 to-transparent text-white p-2">
                                <p className="mb-1">Ver</p>
                                <p>tiendas formales</p>
                            </div>
                        </button>
                    </Link>
                    <button
                        className="relative flex flex-col items-center justify-center w-full h-full bg-gray-100 shadow-lg transition-colors duration-300 ease-in-out hover:bg-gray-200"
                        onClick={() => console.log('Ver tiendas informales')}
                    >
                        <img src="informal.jpg" alt="Ver tiendas informales" className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 w-full text-center bg-gradient-to-t from-gray-900 to-transparent text-white p-2">
                            <p className="mb-1">Ver</p>
                            <p>tiendas informales</p>
                        </div>
                    </button>
                    <button
                        className="relative flex flex-col items-center justify-center w-full h-full bg-gray-100 shadow-lg transition-colors duration-300 ease-in-out hover:bg-gray-200"
                        onClick={() => console.log('Ver todas')}
                    >
                        <img src="all.jpg" alt="Ver todas" className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 w-full text-center bg-gradient-to-t from-gray-900 to-transparent text-white p-2">
                            <p className="mb-1">Ver</p>
                            <p>todas</p>
                        </div>
                    </button>
                </div>

            </div>

        </div>

    );
};

export { Tienda };
