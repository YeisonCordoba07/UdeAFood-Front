import React, { useState } from 'react'

const InformacionTienda = (tienda) => {


  const [isOpen, setIsOpen] = useState(false);
  
  if (!tienda) return null;

  const infoTienda = tienda.tienda;
  return (
    <>
      <button className='bg-green-600 py-2 px-5 h-10 rounded-sm text-white font-bold' onClick={() => setIsOpen(true)}>
        Información
      </button>
      {
        isOpen && (
          <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm items-center flex justify-center z-20'>
            <div className='bg-white p-5 rounded flex flex-col justify-center items-center gap-5'>
              <div className='flex flex-col'>
                <h1 className="text-xl font-semibold text-center">Horarios</h1>
                <span>Lunes-viernes: 8am - 8pm</span>
                <span>Sábados y domingos: 8am - 2pm</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-center">Dirección</h2>
                <span>{infoTienda.ubicacion || 'Ubicación no disponible'}</span>  

              </div>
              <div>
                <h3 className="text-xl font-semibold text-center">Servicio Domicilio</h3>
                <span>{infoTienda.domicilio}</span>

              </div>
              <div className='flex flex-col'>
                <h4 className="text-xl font-semibold text-center">Formas de pago</h4>
                <span>Ahorro  a la mano</span>
                <span>Nequi</span>
              </div>
              <div>
                <button className='bg-gray-600 py-2 px-6 rounded-sm text-white font-semibold' onClick={() => setIsOpen(false)}>
                  Cerrar </button>
              </div>

            </div>
          </div>
        )
      }


    </>
  )
}

export { InformacionTienda };