import React from 'react'
import { InformacionTienda } from './InformacionTienda';
import { useAuth } from '@/context/AuthContext'; 

const PerfilT = ({ tienda }) => {
  const { user, logout } = useAuth();  // Usamos el hook para obtener el usuario y logout

    if (!user) {
        return (
            <div>
                <p>No estás autenticado. Por favor, inicia sesión.</p>
                {/* Lógica para redirigir al inicio de sesión */}
            </div>
        );
    }

  return (
    <div className='flex flex-[1] p-5 w-full justify-between gap-5'>
      <img src={tienda.foto || 'udeafood.jpg'} className='w-14 h-14' alt='logo'/>
      <div className='flex flex-col w-full'>
        <h1 className="text-4xl font-bold">{tienda.nombre || 'Nombre de la Tienda'} </h1>
        <p className='justify-center'>
          {tienda.descripcion || 'Descripción de la tienda no disponible.'}
        </p>
      </div>
      <InformacionTienda tienda={InformacionTienda} />
    </div>
  )
}

export { PerfilT };