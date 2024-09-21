import { FormularioRegistro } from "@/components/registro/FormularioRegistro";
import { HeaderRegistro } from "@/components/registro/HeaderRegistro";

const registro = () =>{
    return(
        <div>
            <HeaderRegistro/>
            <div className="flex flex-col items-center mt-8">
            <h1 className="text-4xl font-black text-green-900 uppercase pb-5">Registrarse</h1>

                <FormularioRegistro/>
            </div>
        </div>
    );
}

export default registro;