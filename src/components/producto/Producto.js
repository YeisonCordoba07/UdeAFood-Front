import { MdInfoOutline } from "react-icons/md";
import { BotonConIcono } from "../BotonConIcono";
import Image from "next/image";


const Producto = ({imagen = "/all.jpg", nombre = "Nombre Producto", precio = "0"}) =>{

    return(

        <div className="flex flex-col w-[290px] h-[380px] p-4 border border-gray-300 rounded-lg font-bold gap-4 items-start shadow-lg">

            <Image src={imagen} alt={nombre} width={300} height={300} className="bg-no-repeat max-w-[250px] min-h-[200px] max-h-64 object-cover"/>


            <div className="flex gap-1 flex-col w-full">

            <span className="text-xl overflow-hidden text-ellipsis whitespace-nowrap w-full">{nombre}</span>

                <span className="text-2xl  overflow-hidden text-ellipsis whitespace-nowrap">$ {precio}</span>

            </div>

            <BotonConIcono 
            icono={<MdInfoOutline />}/>
        </div>

    );
}


export {Producto};