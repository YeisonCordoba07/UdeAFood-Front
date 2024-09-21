import React from 'react'
import { HeaderRegistro } from '@/components/registro/HeaderRegistro'
import { FormularioInicioSesion } from '@/components/InicioSesion/FormularioInicioSesion';

const InicioSesion = () => {
  return (
    <div>
        <HeaderRegistro/>
        <div className="flex flex-col items-center mt-8">
        <h1 className="text-4xl font-black text-green-900 uppercase">Iniciar sesión</h1>

            <FormularioInicioSesion/>

        </div>


    </div>
  )
}

export default InicioSesion;