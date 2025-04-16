import { ElementoFormulario } from "./ElementoFormulario";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const FormularioRegistro = () => {

    const [mensaje, setMensaje] = useState("");
    const router = useRouter();
    const [nuevaTienda, setNuevaTienda] = useState({
      nombre: "",
      descripcion: "",
      ubicacion: "",
      foto: "",
      tipoTienda: "",
      correo: "",
      usuario: "",
      clave: "",
      domicilio: "",
      contacto: "",
    });



    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Obtiene el primer archivo seleccionado
        const reader = new FileReader();

        reader.onloadend = () => {
            setNuevaTienda({ ...nuevaTienda, foto: reader.result.split(",")[1] }); // Convierte a base64 y actualiza el estado
        };

        if (file) {
            reader.readAsDataURL(file); // Lee la imagen como una URL de datos (base64)
        }
    };



    const crearTienda = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/Tienda/crearTienda", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevaTienda),
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
                setMensaje("Tienda creada exitosamente");
                router.push("/inicioSesion"); // Redirigir a PerfilTienda
            })
            .catch((error) => console.error("Error al crear tienda:", error));
    }





    return (
        <form className="flex gap-3 flex-col w-[650px] mb-20" onSubmit={crearTienda}>

            <ElementoFormulario
                identificador={"nombre"}
                textoLabel={"Nombre de la tienda *"}
                placeholderLabel={"Ejm: Tienda de la esquina"}
                esRequerido={true}
                defaultValue={nuevaTienda.nombre}
                onChange={(e) => setNuevaTienda({ ...nuevaTienda, nombre: e.target.value })}
            />

            <ElementoFormulario
                identificador={"descripcion"}
                textoLabel={"Descripción"}
                placeholderLabel={"Vendemos comida rapida"}
                defaultValue={nuevaTienda.descripcion}
                onChange={(e) => setNuevaTienda({ ...nuevaTienda, descripcion: e.target.value })}
            />

            <ElementoFormulario
                identificador={"ubicacion"}
                textoLabel={"Ubicación"}
                placeholderLabel={"Frente al bloque 19"}
                defaultValue={nuevaTienda.ubicacion}
                onChange={(e) => setNuevaTienda({ ...nuevaTienda, ubicacion: e.target.value })}
            />

            {/*<div>
                <label htmlFor="foto">Foto</label>
                <input
                    type="file"
                    accept="image/*" // Acepta solo imágenes
                    onChange={handleFileChange} // Maneja la subida de archivos
                    className="border p-2 rounded"
                />
            </div>*/}

            <ElementoFormulario
                    identificador={"imagen"}
                    textoLabel={"Imagen"}
                    esRequerido={false}
                    type="file"
                    onChange={handleFileChange} 
                />

            <ElementoFormulario
                identificador="tipoTienda"
                textoLabel="Tipo de tienda *"
                esRequerido={true}
                placeholderLabel="Seleccione"
                defaultValue={nuevaTienda.tipoTienda}
                onChange={(e) => setNuevaTienda({ ...nuevaTienda, tipoTienda: e.target.value })}
                type="select"
                options={["FORMAL", "INFORMAL"]}
            />

            <ElementoFormulario
                identificador={"correo"}
                textoLabel={"Correo *"}
                placeholderLabel={"example@gmail.com"}
                esRequerido={true}

                defaultValue={nuevaTienda.correo}
                onChange={(e) => setNuevaTienda({ ...nuevaTienda, correo: e.target.value })}
            />

            <ElementoFormulario
                identificador={"usuario"}
                textoLabel={"Nombre de usuario *"}
                placeholderLabel={"arboreo_udea"}
                esRequerido={true}
                defaultValue={nuevaTienda.usuario}
                onChange={(e) => setNuevaTienda({ ...nuevaTienda, usuario: e.target.value })}
            />

            <ElementoFormulario
                identificador={"clave"}
                textoLabel={"Contraseña *"}
                placeholderLabel={"Clave"}
                esRequerido={true}
                defaultValue={nuevaTienda.clave}
                onChange={(e) => setNuevaTienda({ ...nuevaTienda, clave: e.target.value })}
            />

            <ElementoFormulario
                identificador={"domicilio"}
                textoLabel={"Domicilio *"}
                placeholderLabel={"S o N"}
                esRequerido={true}
                defaultValue={nuevaTienda.domicilio}
                onChange={(e) => setNuevaTienda({ ...nuevaTienda, domicilio: e.target.value })}
            />



            {/*<ElementoFormulario
            identificador={"formas-de-pago"}
            textoLabel={"Formas de pago"}
            placeholderLabel={"Visa, Mastercard, Efectivo"}
        />*/}


            <ElementoFormulario
                identificador={"contacto"}
                textoLabel={"Teléfono de contacto"}
                placeholderLabel={"+57 123 456 7890"}
                defaultValue={nuevaTienda.contacto}
                onChange={(e) => setNuevaTienda({ ...nuevaTienda, contacto: e.target.value })}
            />




            <button
                type="submit"
                className="bg-green-600 text-white font-bold text-xl py-2 rounded-lg hover:bg-green-700 hover:scale-105 duration-300">Registrarse</button>

            {mensaje && (
                <p className={`mt-4 ${mensaje.includes("exitoso") ? "text-green-600" : "text-red-600"}`}>
                    {mensaje}
                </p>
            )}


          <div className={"flex flex-col gap-2"}>

            <Link href={"/RegistroUsuarios"} className={"w-fit"}>
              <span className="text-blue-600 underline">Registrarse como usuario</span>
            </Link>

            <Link href={"/inicioSesion"} className={"w-fit"}>
              <span className="text-blue-600 underline">Iniciar sesión</span>
            </Link>

          </div>
        </form>
    );
}

export { FormularioRegistro };