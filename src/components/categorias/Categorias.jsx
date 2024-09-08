import { BotonAnterior } from "./BotonAnterior";
import { BotonSiguiente } from "./BotonSiguiente";
import { ElementoCategoria } from "./ElementoCategoria";

import { useRef } from "react";



const Categorias = () => {

    const carouselRef = useRef(null);

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };


    return (
        <div className="px-8 py-3 flex items-center">
            <BotonAnterior onClick={scrollLeft} />

            <div className="flex overflow-x-auto whitespace-nowrap gap-x-2 w-[1200px] categorias-container" ref={carouselRef}>
                <ElementoCategoria textoCategoria={"Pizza"} />
                <ElementoCategoria textoCategoria={"Asiatica"} />
                <ElementoCategoria textoCategoria={"Poke"} />
                <ElementoCategoria textoCategoria={"Empanazas"} />
                <ElementoCategoria textoCategoria={"Sushi"} />
                <ElementoCategoria textoCategoria={"Sanduches"} />
                <ElementoCategoria textoCategoria={"Tipica"} />
                <ElementoCategoria textoCategoria={"Vegana"} />
                <ElementoCategoria textoCategoria={"Pollo"} />
                <ElementoCategoria textoCategoria={"Jugos"} />
                <ElementoCategoria textoCategoria={"Desayuno"} />
                <ElementoCategoria textoCategoria={"Hamburguesas"} />
                <ElementoCategoria textoCategoria={"Perros"} />
                <ElementoCategoria textoCategoria={"Mexicana"} />
                <ElementoCategoria textoCategoria={"Cafe"} />
                <ElementoCategoria textoCategoria={"Panadería"} />
                <ElementoCategoria textoCategoria={"Japonesa"} />
                <ElementoCategoria textoCategoria={"China"} />
                <ElementoCategoria textoCategoria={"Alcohol"} />
                <ElementoCategoria textoCategoria={"Ensaladas"} />
            </div>

            <BotonSiguiente onClick={scrollRight} />
        </div>
    );
}


export { Categorias };
