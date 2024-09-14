import React from 'react'
import { HeaderRegistro } from '@/components/registro/HeaderRegistro'
import { FormularioInicioSesion } from '@/components/InicioSesion/FormularioInicioSesion';

const InicioSesion = () => {
  return (
    <div>
        <HeaderRegistro/>
        <div className="flex justify-center mt-8">
            <FormularioInicioSesion/>

        </div>


    </div>
  )
}

export default InicioSesion;