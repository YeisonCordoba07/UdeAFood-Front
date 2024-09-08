import React from 'react';

const ElementoCategoria = ({textoCategoria}) => {
    return (
            <button className="bg-zinc-200 hover:bg-lime-300 py-2 px-4 text-zinc-700 hover:text-zinc-800 rounded-full duration-200">
                {textoCategoria}
            </button>
    );
};

export {ElementoCategoria};