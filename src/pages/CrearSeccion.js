import React from 'react'
import { HeaderRegistro } from '@/components/registro/HeaderRegistro'
import { CreadorSeccion } from '@/components/CrearSeccion/CreadorSeccion';


const CrearSeccion = () => {
  return (
    
    <div>
        <HeaderRegistro />
        <div className="flex flex-col items-center mt-8">
            <h1 className="text-4xl font-black text-green-900 uppercase">Crear sección</h1>

            <CreadorSeccion/>

        </div>


    </div>
  )
}

export default CrearSeccion