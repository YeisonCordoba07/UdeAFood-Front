import { ElementoFormulario } from "./ElementoFormulario";

const FormularioRegistro = () => {

    const crearTienda = (e) => {
        e.preventDefault();
    }

    return (
        <form className="flex gap-3 flex-col w-[650px]" onSubmit={crearTienda}>

            <ElementoFormulario
                identificador={"nombre"}
                textoLabel={"Nombre de la tienda *"}
                placeholderLabel={"Ejm: Tienda de la esquina"}
                esRequerido={true}
            />

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

            <ElementoFormulario
                identificador={"descripcion"}
                textoLabel={"Descripción"}
                placeholderLabel={"Vendemos comida rapida"}
            />

            <ElementoFormulario
                identificador={"foto"}
                textoLabel={"Foto"}
                placeholderLabel={"foto"}
            />

            <ElementoFormulario
                identificador={"ubicacion"}
                textoLabel={"Ubicación"}
                placeholderLabel={"Frente al bloque 19"}
            />

            <ElementoFormulario
                identificador={"formas-de-pago"}
                textoLabel={"Formas de pago"}
                placeholderLabel={"Visa, Mastercard, Efectivo"}
            />

            <ElementoFormulario
                identificador={"contacto"}
                textoLabel={"Información de contacto"}
                placeholderLabel={"+57 123 456 7890"}
            />

            <button 
            type = "submit"
            className="bg-green-400 text-white font-bold text-xl py-2 rounded-lg hover:bg-green-500 hover:scale-105 duration-300">Registrarse</button>
        </form>
    );
}

export { FormularioRegistro };