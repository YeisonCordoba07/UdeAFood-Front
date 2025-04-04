const BotonConIcono = ({ textoBoton = "Ver mas", icono = null, onClick }) => {


    return (
        <button className="bg-green-600 px-5 py-2 font-bold flex items-center justify-between gap-5 rounded-lg text-white  text-xl hover:bg-green-700 hover:scale-105 duration-300 w-full"
        onClick={onClick}
        >

            <span className="overflow-hidden text-ellipsis whitespace-nowrap">{textoBoton}</span>
            <div className="text-3xl">
                {icono}
            </div>

        </button>
    );
}


export { BotonConIcono }