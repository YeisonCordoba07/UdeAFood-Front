import { MdInfoOutline } from "react-icons/md";
import { BotonConIcono } from "../BotonConIcono";
import Image from "next/image";
import {useState} from "react";
import { ElementoCategoria } from "../categorias/ElementoCategoria";


const Producto = ({imagen = "/all.jpg", nombre = "Nombre Producto", precio = "0", producto}) =>{
    const [mostrarDetalles, setMostrarDetalles] = useState(false);


    function handleMostrarDetalles(e){
        e.stopPropagation();
        setMostrarDetalles((prev)=>{return !prev});
    }

    
    return(
        <div>

            <div className="flex flex-col w-[290px] h-[380px] p-4 border border-gray-100 rounded-lg font-bold gap-4 items-start shadow-lg"
            >

                <Image src={imagen} alt={nombre} width={300} height={300} className="bg-no-repeat max-w-[250px] min-h-[200px] max-h-64 object-cover rounded-md mx-auto"/>


                <div className="flex gap-1 flex-col w-full">

                <span className="text-xl overflow-hidden text-ellipsis whitespace-nowrap w-full">{nombre}</span>

                    <span className="text-2xl  overflow-hidden text-ellipsis whitespace-nowrap">$ {precio}</span>

                </div>

                <BotonConIcono icono={<MdInfoOutline/>} onClick={e =>handleMostrarDetalles(e)}/>

            </div>





            {mostrarDetalles &&
                <div className="fixed w-screen h-screen bg-black bg-opacity-60 z-50 flex justify-center items-center top-0 right-0"
                    onClick={(e)=>handleMostrarDetalles(e)}>

                    <div 
                        className="w-[800px] bg-white rounded-md h-fit] flex gap-7 p-7 " 
                        onClick={(e) => e.stopPropagation()}>

                        {/* Imagen y categorias */} 
                        <div className="flex flex-col gap-4 w-2/3">
                            <Image 
                                src={imagen} alt={nombre} 
                                width={300} 
                                height={300} 
                                className="bg-no-repeat w-full h-fit object-cover rounded-md" 
                            />

                            {/* Categorias del producto */} 
                            <div className="flex flex-wrap gap-2 w-full">

                                {producto.categoria && producto.categoria.length > 0 && producto.categoria.map((categoria)=>{
           
                                    return(
                                        <div key={categoria.idCategoria} onClick={(e)=>{handleMostrarDetalles(e)}}>

                                            <ElementoCategoria 
                                                key={categoria.idCategoria} 
                                                textoCategoria={categoria.nombreCategoria}
                                            />
                                        </div>

                                    );
                                })}
                            </div>

                        </div>



                        {/* Información del producto */}
                        <div className="flex flex-col gap-5 w-1/3 ">
                            <div>
                                <span className="font-bold">Nombre</span>
                                <p>{producto.nombre}</p>
                            </div>
                            <div>
                                <span className="font-bold">Descripción</span>
                                <p>{producto.descripcion}</p>
                            </div>
                            <div>
                                <span className="font-bold">Precio</span>
                                <p>{producto.precio}</p>
                            </div>
                            <div>
                                <span className="font-bold">Disponible</span>
                                <p>{producto.descripcion === "S" ? "Sí" : "No"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>

    );
}


export {Producto};