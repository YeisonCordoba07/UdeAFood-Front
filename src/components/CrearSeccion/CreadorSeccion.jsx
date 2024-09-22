import React from 'react'
import { ElementoFormulario } from '../registro/ElementoFormulario';

const CreadorSeccion = () => {
    return (
        <form className="flex gap-3 flex-col w-[650px] py-11">
            <ElementoFormulario
                identificador={"Seccion"}
                textoLabel={"Nombre de la Seccion *"}
                placeholderLabel={"pizza, hamburguesa, Empanadas, Su..."}
                esRequerido={true}
            />

            <button
                type="submit"
                className="bg-green-600 text-white font-bold text-xl py-2 rounded-lg hover:bg-green-700 hover:scale-105 duration-300">
                Crear Sección</button>
        </form>
    )
}

export {CreadorSeccion};