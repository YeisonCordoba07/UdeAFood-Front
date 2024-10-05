import React, { useState } from 'react';

import { mostrarTiendasDialog } from '../mostrarTiendaDialog/mostrarTiendasDialog';

const Tienda = () => {

    const[openTiendaDialog, setOpenTiendaDialog] = useState(false);

return (
    <div className="h-screen flex items-center justify-center">
        <div className="w-full h-3/5 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-4 w-full h-full">
            <button
                className="relative flex flex-col items-center justify-center w-full h-full bg-gray-100 shadow-lg transition-colors duration-300 ease-in-out hover:bg-gray-200"
                onClick={() => console.log('Ver tiendas formales')}
            >
            <img src="formal.jpg" alt="Ver tiendas formales" className="w-full h-3/4 object-cover" />
            <div className="absolute bottom-0 w-full text-center bg-gradient-to-t from-gray-900 to-transparent text-white p-2">
            <p className="mb-1">Ver</p>
            <p>tiendas formales</p>
            </div>
            </button>
            <button
            className="relative flex flex-col items-center justify-center w-full h-full bg-gray-100 shadow-lg transition-colors duration-300 ease-in-out hover:bg-gray-200"
            onClick={() => console.log('Ver tiendas informales')}
            >
            <img src="informal.jpg" alt="Ver tiendas informales" className="w-full h-3/4 object-cover" />
            <div className="absolute bottom-0 w-full text-center bg-gradient-to-t from-gray-900 to-transparent text-white p-2">
                <p className="mb-1">Ver</p>
                <p>tiendas informales</p>
            </div>
            </button>
            <button
            className="relative flex flex-col items-center justify-center w-full h-full bg-gray-100 shadow-lg transition-colors duration-300 ease-in-out hover:bg-gray-200"
            onClick={() => setOpenTiendaDialog(true)}
            >
            <img src="all.jpg" alt="Ver todas" className="w-full h-3/4 object-cover" />
            <div className="absolute bottom-0 w-full text-center bg-gradient-to-t from-gray-900 to-transparent text-white p-2">
                <p className="mb-1">Ver</p>
                <p>todas</p>
            </div>
            </button>
        </div>
        <mostrarTiendasDialog open={openTiendaDialog} setOpen={setOpenTiendaDialog} />

        </div>

    </div>
    
    );
};

export { Tienda };
