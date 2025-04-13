import React from 'react'
import Link from 'next/link';


const BotonActualizar = ({ productoId }) => {
    

  return (
    <Link href={`/CrearProducto?id=${productoId}`}>
    
        <button 
                className="bg-green-200 text-green-700 font-medium text-xs py-2 px-4 rounded-lg hover:bg-green-400 duration-200 transition-colors whitespace-nowrap flex flex-col items-center">
            Actualizar
        </button>
    </Link>
    
  )
}

export {BotonActualizar};