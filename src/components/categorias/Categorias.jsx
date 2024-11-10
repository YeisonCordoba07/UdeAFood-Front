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

        <div className="py-2 flex items-center border-neutral-200 border-b justify-center w-full">

            <BotonFlechaCategoria onClick={scrollLeft} icono={<MdArrowBackIosNew/>} />

            <div
                className="flex px-3 overflow-x-auto whitespace-nowrap gap-x-2 w-[1200px] categorias-container items-center border-l-2 border-r-2 py-1"
                ref={carouselRef}>

                {!loading && !error?
                    (data.map(categoria => {
                            return (
                                <ElementoCategoria key={categoria.idCategoria} textoCategoria={categoria.nombreCategoria}/>
                            )
                        })
                    )
                    :
                    (
                    
                        // Array de elementos para mostrar un esqueleto de carga
                        [...Array(30)].map((_, index) => {
                            return (
                                <ElementoCategoria key={index} textoCategoria=""
                                />
                            )
                        })
                        
                    )
                }

            </div>

            <BotonFlechaCategoria onClick={scrollRight} icono={<MdArrowForwardIos/>}/>
            
        </div>

    );
}


export { Categorias };
