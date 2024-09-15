import React, { useState } from 'react'
import { useState } from 'react';

const InformacionTienda = () => {

  const [isopen, setIsopen]=useState(false);
  return (
    <>
    <button className='bg-green-600 py-2 px-6 rounded-sm text-white font-bold'>
      Información
    </button>
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm items-center flex justify-center  '> 
        <div className='bg-white p-5 rounded flex flex-col justify-center items-center gap-5'>
          <div>
            <span className="text-xl font-semibold">Horarios</span>
          </div>
          <di>
            <span className="text-xl font-semibold">Dirección</span>
          </di>
          <div>
            <span className="text-xl font-semibold">Servicio Domicilio</span>
          </div>
          <div>
            <span className="text-xl font-semibold">Formas de pago</span>

          </div>

        </div> 

           
          </div>

    </>
  )
}

export {InformacionTienda};