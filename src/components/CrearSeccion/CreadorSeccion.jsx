import React, { useState } from 'react'
import { ElementoFormulario } from '../registro/ElementoFormulario';

const CreadorSeccion = () => {

    const [nuevaSeccion, setNuevaSeccion] = useState({
        nombre: "",
        idTienda:1
    })

    const crearSeccion = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/Seccion/crearSeccion",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevaSeccion), 
        })
        .then((res) => {
            // Verificamos si el contenido es JSON
            const contentType = res.headers.get("Content-Type");
            if (contentType && contentType.includes("application/json")) {
                return res.json(); // Si es JSON, lo procesamos
            } else {
                return res.text(); // Si es texto, lo procesamos como texto
            }
        })
        .then((response) => {
            console.log("Respuesta del servidor:", response);
        })
        .catch((error) => console.error("Error al crear Seccion:", error));
    }

    return (
        <form className="flex gap-3 flex-col w-[650px] py-11" onSubmit={crearSeccion}>
            <ElementoFormulario
                identificador={"nombre"}
                textoLabel={"Nombre de la Seccion *"}
                placeholderLabel={"pizza, hamburguesa, Empanadas, Su..."}
                esRequerido={true}
                defaultValue={nuevaSeccion.nombre}
                    onChange={(e) => setNuevaSeccion({ ...nuevaSeccion, nombre: e.target.value })}
            />
              <ElementoFormulario
                identificador={"idTienda"}
                textoLabel={"Id de Tienda *"}
                placeholderLabel={"1,2"}
                esRequerido={true}
                defaultValue={nuevaSeccion.idTienda}
                    onChange={(e) => setNuevaSeccion({ ...nuevaSeccion, idTienda: e.target.value })}
            />

            <button
                type="submit"
                className="bg-green-600 text-white font-bold text-xl py-2 rounded-lg hover:bg-green-700 hover:scale-105 duration-300">
                Crear Sección</button>
        </form>
    )
}

export {CreadorSeccion};