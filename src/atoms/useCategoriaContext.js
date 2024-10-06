import {atom, useAtom} from "jotai";

const datosDeBusquedaCategoria = atom({
    categoriaData: [],
});


const useCategoriaContext = () => {

    const [categoriaData, setCategoriaData] = useAtom(datosDeBusquedaCategoria);
    return {
        categoriaData,
        setCategoriaData,
    };
}

export {useCategoriaContext};