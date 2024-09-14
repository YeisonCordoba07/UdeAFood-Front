import React from 'react'
import { ElementoFormulario } from '../registro/ElementoFormulario';

const FormularioInicioSesion = () => {
  return (
    <form className="flex gap-3 flex-col w-[650px] py-11">
        <ElementoFormulario
                identificador={"correo"}
                textoLabel={"Correo *"}
                placeholderLabel={"example@gmail.com"}
                esRequerido={true}
            />

            <ElementoFormulario
                identificador={"clave"}
                textoLabel={"Contraseña *"}
                placeholderLabel={"Clave"}
                esRequerido={true}
            />
            <button 
            type = "submit"
            className="bg-green-400 text-white font-bold text-xl py-2 rounded-lg hover:bg-green-500 hover:scale-105 duration-300">
                Iniciar Sesión</button>
    </form>
  )
}

export {FormularioInicioSesion};