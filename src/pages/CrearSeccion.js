import React from 'react'
import { CreadorSeccion } from '@/components/CrearSeccion/CreadorSeccion';
import { Header } from '@/components/Header/Header';


const CrearSeccion = () => {
  return (
    
    <div>
        <Header />
        
        <div className="flex flex-col items-center mt-8">
            <h1 className="text-4xl font-black text-green-900 uppercase">Crear sección</h1>

            <CreadorSeccion/>

        </div>


    </div>
  )
}

export default CrearSeccion