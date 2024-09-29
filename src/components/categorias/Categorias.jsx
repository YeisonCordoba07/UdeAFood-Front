import { BotonFlechaCategoria } from "./BotonFlechaCategoria";
import { ElementoCategoria } from "./ElementoCategoria";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

import { useRef } from "react";
import { useFetch } from "@/hook/useFetch";



const Categorias = () => {

    const {data, loading, error} = useFetch("http://localhost:8080/Categoria");
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

        <div className="py-3 flex items-center border-neutral-400 border-b justify-center w-full">
            <BotonFlechaCategoria onClick={scrollLeft} icono={<MdArrowBackIosNew/>} />

            <div
                className="flex px-3 overflow-x-auto whitespace-nowrap gap-x-2 w-[1200px] categorias-container items-center"
                ref={carouselRef}>
                {!error ?
                    (data.map(categoria => {
                            return (
                                <ElementoCategoria key={categoria.idCategoria} textoCategoria={categoria.nombreCategoria}/>
                            )
                        })
                    )
                    :
                    (<>
                        <ElementoCategoria textoCategoria={"Pizza"}/>
                        <ElementoCategoria textoCategoria={"Asiatica"}/>
                        <ElementoCategoria textoCategoria={"Poke"}/>
                        <ElementoCategoria textoCategoria={"Empanazas"}/>
                        <ElementoCategoria textoCategoria={"Sushi"}/>
                        <ElementoCategoria textoCategoria={"Sanduches"}/>
                        <ElementoCategoria textoCategoria={"Tipica"}/>
                        <ElementoCategoria textoCategoria={"Vegana"}/>
                        <ElementoCategoria textoCategoria={"Pollo"}/>
                        <ElementoCategoria textoCategoria={"Jugos"}/>
                        <ElementoCategoria textoCategoria={"Desayuno"}/>
                        <ElementoCategoria textoCategoria={"Hamburguesas"}/>
                        <ElementoCategoria textoCategoria={"Perros"}/>
                        <ElementoCategoria textoCategoria={"Mexicana"}/>
                        <ElementoCategoria textoCategoria={"Cafe"}/>
                        <ElementoCategoria textoCategoria={"Panadería"}/>
                        <ElementoCategoria textoCategoria={"Japonesa"}/>
                        <ElementoCategoria textoCategoria={"China"}/>
                        <ElementoCategoria textoCategoria={"Alcohol"}/>
                        <ElementoCategoria textoCategoria={"Ensaladas"}/>
                    </>)
                }

            </div>

            <BotonFlechaCategoria onClick={scrollRight} icono={<MdArrowForwardIos/>}/>
            
        </div>

    );
}


export { Categorias };
