const BotonConIcono = ({ textoBoton = "Ver mas", icono = null, onClick, background, textColor, backgroundHover }) => {


    return (
        <button className={`px-5 py-2 font-bold flex items-center justify-between gap-5 rounded-lg  text-xl hover:bg-green-700 hover:scale-105 duration-300 w-full ${background? background : "bg-green-600"} ${textColor ? textColor : "text-white"} ${backgroundHover ? `hover:${backgroundHover}` : "hover:bg-green-700"}`}
        onClick={onClick}
        >

            <span className="overflow-hidden text-ellipsis whitespace-nowrap flex justify-center w-full">{textoBoton}</span>
            {icono && <div className="text-3xl">
                {icono}
            </div>}

        </button>
    );
}


export { BotonConIcono }