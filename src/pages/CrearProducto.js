import { FormularioCrearProducto } from "@/components/FormularioCrearProducto/FormularioCrearProducto";
import { Header } from "@/components/Header/Header";
import { ElementoFormulario } from "@/components/registro/ElementoFormulario";

const CrearProducto = () => {


    const crearTienda = (e) => {
        e.preventDefault();
    }


    return (
        <div className="flex flex-col items-center gap-10">

            <Header/>
            <FormularioCrearProducto />

        </div>
    );
}

export default CrearProducto;