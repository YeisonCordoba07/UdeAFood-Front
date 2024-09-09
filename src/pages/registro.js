import { FormularioRegistro } from "@/components/registro/FormularioRegistro";
import { HeaderRegistro } from "@/components/registro/HeaderRegistro";

const registro = () =>{
    return(
        <div>
            <HeaderRegistro/>
            <div className="flex justify-center mt-8">
                <FormularioRegistro/>
            </div>
        </div>
    );
}

export default registro;