import {HeaderRegistro} from "@/components/registro/HeaderRegistro";
import React, {useState} from "react";
import {ElementoFormulario} from "@/components/registro/ElementoFormulario";
import {useRouter} from "next/router";
import Link from "next/link";

export default function RegistroUsuarios() {

  const router = useRouter();
  const [mensaje, setMensaje] = useState("");

  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    clave: ""
  });


  async function crearUsuario(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/usuario/crearUsuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoUsuario),
      })

      if (!response.ok) {
        const errorText = await response.text(); // Obtener el mensaje de error del servidor
        setMensaje(errorText); // Actualiza el estado con el mensaje de error
        throw new Error(errorText);
      }

      const data = await response.text();
      setMensaje("Usuario creado exitosamente");
      router.push("/inicioSesion");

    } catch (error) {
      console.error("Error al crear el usuario:", error);
    } finally {

    }
  }


  return (
    <div>
      <HeaderRegistro/>
      <div className="flex flex-col items-center  mt-8 ">
        <h1 className="text-4xl font-black text-green-900 uppercase pb-5 mb-5">Registrarse como usuario
        </h1>

        <form className="flex gap-3 flex-col w-[650px] mb-20" onSubmit={crearUsuario}>

          <ElementoFormulario
            identificador={"nombre"}
            textoLabel={"Nombre *"}
            placeholderLabel={"Ejm: Juan"}
            esRequerido={true}
            defaultValue={nuevoUsuario.nombre}
            onChange={(e) => setNuevoUsuario({...nuevoUsuario, nombre: e.target.value})}
          />

          <ElementoFormulario
            identificador={"apellido"}
            textoLabel={"Apellido *"}
            placeholderLabel={"Ejm: Valdez"}
            esRequerido={true}
            defaultValue={nuevoUsuario.apellido}
            onChange={(e) => setNuevoUsuario({...nuevoUsuario, apellido: e.target.value})}
          />

          <ElementoFormulario
            identificador={"correo"}
            textoLabel={"Correo *"}
            placeholderLabel={"Ejm: JuanValdez@gmail.com"}
            esRequerido={true}
            defaultValue={nuevoUsuario.correo}
            onChange={(e) => setNuevoUsuario({...nuevoUsuario, correo: e.target.value})}
          />

          <ElementoFormulario
            identificador={"clave"}
            textoLabel={"Contraseña *"}
            placeholderLabel={"*********"}
            esRequerido={true}
            defaultValue={nuevoUsuario.clave}
            onChange={(e) => setNuevoUsuario({...nuevoUsuario, clave: e.target.value})}
          />


          <button
            type="submit"
            className="bg-green-600 text-white font-bold text-xl py-2 rounded-lg hover:bg-green-700 hover:scale-105 duration-300 mt-5">
            Registrarse
          </button>

          {mensaje && (
            <p className={`text-center text-red-600`}>
              {mensaje}
            </p>
          )}



          <div className={"flex flex-col gap-2"}>

            <Link href={"/registro"} className={"w-fit"}>
              <span className="text-blue-600 underline">Registrarse como tienda</span>
            </Link>

            <Link href={"/inicioSesion"} className={"w-fit"}>
              <span className="text-blue-600 underline">Iniciar sesión</span>
            </Link>

          </div>

        </form>


      </div>
    </div>
  );
}