import {atom, useAtom} from "jotai";

const datosDeBusqueda = atom({
    data: [],
});


const useBusquedaContext = () => {

    const [data, setData] = useAtom(datosDeBusqueda);
    return {
        data,
        setData,
    };
}

export {useBusquedaContext};