

const BotonFlechaCategoria = ({ onClick, icono }) => {
    return (
        <button
            onClick={onClick}
            className="bg-neutral-300 rounded-full p-3 drop-shadow-lg hover:bg-lime-400 duration-200 hover:scale-110 mx-1"
        >
            {icono}
        </button>
    );
};

export { BotonFlechaCategoria };