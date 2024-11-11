
import { MdInfoOutline } from "react-icons/md";

import Image from "next/image";
import { BotonConIcono } from "@/components/BotonConIcono";

const BusquedaTiendas = ({ tiendas }) => {
    return (

        <div className="flex gap-5 flex-wrap p-5">

            {
                tiendas.map((tienda) => (
                    <div key={tienda.id} className="flex flex-col w-[290px] h-[380px] p-4 border border-gray-100 rounded-lg font-bold gap-4 items-start shadow-lg">

                        {/* Imagen de la tienda */}
                        <Image
                            src={tienda.foto ? `data:image/jpeg;base64,${tienda.foto}` : "/all.jpg"}
                            alt={tienda.nombre}
                            width={300}
                            height={300}
                            className="bg-no-repeat max-w-[250px] min-h-[200px] max-h-64 object-cover rounded-md mx-auto"
                        />

                        {/* Nombre de la tienda */}
                        <div className="flex gap-1 flex-col w-full">
                            <span className="text-2xl">{tienda.nombre}</span>
                        </div>

                        {/* Botón con ícono */}
                        <BotonConIcono textoBoton='Ver tienda' icono={<MdInfoOutline />} />

                    </div>
                ))
            }
        </div>
    );

};

export default BusquedaTiendas;