import React from 'react'
import { InformacionTienda } from './InformacionTienda';

const PerfilT = ({nombreTienda, descripcionTienda}) => {
  return (
    <div className='flex w-full items-center justify-between'>
       <img src='udeafood.jpg' className=' w-48 h-48'alt='logo'/>
        <div className='flex flex-col'>
          <h1 className="text-4xl font-bold">{nombreTienda || 'Nombre de la Tienda'} </h1>
          <p className='justify-center'>{descripcionTienda||
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
          </p>
        </div>
        <InformacionTienda/>
    </div>
  )
}

export {PerfilT};