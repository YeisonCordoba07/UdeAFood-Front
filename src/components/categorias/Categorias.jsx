import { BotonAnterior } from "./BotonAnterior";
import { BotonSiguiente } from "./BotonSiguiente";
const { ElementoCategoria } = require("./ElementoCategoria")

const Categorias = () =>{
    return (
        <div className="px-8 py-3 gap-x-2 flex">

            <BotonAnterior/>

            <div className="gap-x-2 flex">
                <ElementoCategoria textoCategoria={"Pizza"} />
                <ElementoCategoria textoCategoria={"Asiatica"} />
                <ElementoCategoria textoCategoria={"Poke"} />
                <ElementoCategoria textoCategoria={"Empanazas"} />
                <ElementoCategoria textoCategoria={"Sushi"} />
                <ElementoCategoria textoCategoria={"Sanduches"} />
                <ElementoCategoria textoCategoria={"Tipica"} />
                <ElementoCategoria textoCategoria={"Vegana"} />
            </div>

            <BotonSiguiente/>

        </div>
    );
}

export {Categorias};