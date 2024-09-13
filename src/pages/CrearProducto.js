import { FormularioCrearProducto } from "@/components/FormularioCrearProducto/FormularioCrearProducto";
import { Header } from "@/components/Header/Header";

const CrearProducto = () => {



    return (
        <div className="flex flex-col items-center gap-10">

            <Header/>
            <FormularioCrearProducto />

        </div>
    );
}

export default CrearProducto;