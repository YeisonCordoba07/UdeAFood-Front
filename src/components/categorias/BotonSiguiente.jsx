
import { MdArrowForwardIos } from "react-icons/md";

const BotonSiguiente = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="bg-gray-300 rounded-full p-3 drop-shadow-lg hover:bg-gray-400 duration-200 hover:scale-110"
        >
            <MdArrowForwardIos />
        </button>
    );
};

export { BotonSiguiente };
