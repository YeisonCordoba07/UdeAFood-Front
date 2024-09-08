import { ElementoFormulario } from "./ElementoFormulario";

const FormularioRegistro = () => {
    return (
        <form className="flex gap-3 flex-col w-[650px]">
            
            <ElementoFormulario
                identificador={"nombre"}
                textoLabel={"Nombre de la tienda"}
                placeholderLabel={"Ejm: Tienda de la esquina"}
            />

            <ElementoFormulario
                identificador={"correo"}
                textoLabel={"Correo"}
                placeholderLabel={"example@gmail.com"}
            />

            <ElementoFormulario
                identificador={"clave"}
                textoLabel={"Contraseña"}
                placeholderLabel={"Clave"}
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
        </form>
    );
}

export { FormularioRegistro };