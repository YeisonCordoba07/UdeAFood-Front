import { ElementoFormulario } from "./ElementoFormulario";
import { useState } from "react";

const FormularioRegistro = () => {

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
            })
            .catch((error) => console.error("Error al crear tienda:", error));
    }
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

    return (
        <form className="flex gap-3 flex-col w-[650px]" onSubmit={crearTienda}>

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

            <ElementoFormulario
                identificador={"foto"}
                textoLabel={"Foto"}
                placeholderLabel={"foto"}
                defaultValue={nuevaTienda.foto}
                onChange={(e) => setNuevaTienda({ ...nuevaTienda, foto: e.target.value })}
            />

            <ElementoFormulario
                identificador="tipoTienda"
                textoLabel="Tipo de tienda *"
                esRequerido={true}
                placeholderLabel="Seleccione"
                defaultValue={nuevaTienda.tipoTienda}
                onChange={(e) => setNuevaTienda({ ...nuevaTienda, tipoTienda: e.target.value })}
                type="select"
                options={["Tienda Formal", "Tienda Informal"]}
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

        </form>
    );
}

export { FormularioRegistro };