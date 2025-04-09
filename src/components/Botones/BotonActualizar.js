import React from 'react'
import Link from 'next/link';


const BotonActualizar = ({ productoId }) => {
    

  return (
    <Link href={`/CrearProducto?id=${productoId}`}>
    
        <button 
                className="bg-green-600 text-white font-medium text-xs py-2 px-4 rounded-lg hover:bg-green-500 duration-300 whitespace-nowrap flex flex-col items-center">
            Actualizar
        </button>
    </Link>
    
  )
}

export {BotonActualizar};