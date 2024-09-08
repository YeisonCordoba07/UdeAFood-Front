import { MdArrowBackIosNew } from "react-icons/md";

const BotonAnterior = () =>{
    return(
        <button className="bg-gray-300 rounded-full p-3 drop-shadow-lg hover:bg-gray-400 duration-200 hover:scale-110">
        <MdArrowBackIosNew/>
    </button>
    );
}

export {BotonAnterior};