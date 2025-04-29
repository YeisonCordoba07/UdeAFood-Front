import {MdInfoOutline} from "react-icons/md";
import {BotonConIcono} from "../Botones/BotonConIcono";
import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import {ElementoCategoria} from "../categorias/ElementoCategoria";
import {BotonEliminar} from "@/components/Botones/BotonEliminar";
import {BotonActualizar} from "@/components/Botones/BotonActualizar";
import {useAuth} from "@/context/AuthContext";
import { useCarrito } from "@/hook/useCarrito";
import { elegirImagen } from "@/lib/elegirImagen";


const Producto = ({producto, idTienda, onDeleteProducto}) => {
  const {user} = useAuth();
  const [puedeEditar, setPuedeEditar] = useState(false);
  const menuRef = useRef(null);
  const {agregarAlCarrito} = useCarrito();


  {/* detalles y opciones ocultas del producto */
  }
  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  const [mostrarMenuOpciones, setMostrarMenuOpciones] = useState(false);


  {/* Verificar que solo el usuario pueda editar */
  }
  useEffect(() => {
    if (user === null || !idTienda) return;
    if (parseInt(user?.id) === parseInt(idTienda)) {
      setPuedeEditar(true);
    }

  }, [idTienda, user]);


  {/* Cerrar el menu de opciones al hacer click fuera de el */
  }
  useEffect(() => {
    const handleClickFuera = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMostrarMenuOpciones(false);
      }
    };

    document.addEventListener("mousedown", handleClickFuera);
    return () => {
      document.removeEventListener("mousedown", handleClickFuera);
    };
  }, []);





  function handleMostrarDetalles(e) {
    e.stopPropagation();
    setMostrarDetalles((prev) => {
      return !prev
    });
  }


  return (
    <>
      <div
        className="flex flex-col w-[290px] h-[380px] p-4 border border-gray-100 rounded-lg font-bold gap-4 items-start shadow-lg group relative"
      >

        <Image
          src={elegirImagen(producto)} alt={""}
          width={300}
          height={300}
          className="bg-no-repeat max-w-[250px] min-h-[200px] max-h-64 object-cover rounded-md mx-auto"/>


        <div className="flex gap-1 flex-col w-full">

          <span className="text-xl overflow-hidden text-ellipsis whitespace-nowrap w-full">{producto?.nombre}</span>

          <span className="text-2xl  overflow-hidden text-ellipsis whitespace-nowrap">$ {producto?.precio}</span>

        </div>

        <BotonConIcono icono={<MdInfoOutline/>} textoBoton="Agregar al carrito" onClick={e => agregarAlCarrito(producto)}/>


        {/* Menu de opciones (eliminar, actualizar) */}
        {puedeEditar &&
          <div
            ref={menuRef}
            className={`absolute top-2 right-2 gap-2 
                  group-hover:flex group-hover:flex-col items-end ${mostrarMenuOpciones ? "flex flex-col" : "hidden"}`}>
            <button
              className={"flex rounded-full bg-gray-300 hover:bg-gray-400 w-10 h-10 items-center justify-center"}
              onClick={() => setMostrarMenuOpciones((prev) => {
                return !prev
              })}

            >
              {/* Icono de 3 puntos */}
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" stroke="currentColor"
                   strokeWidth={2}
                   strokeLinecap="round" strokeLinejoin="round" className="icon-tabler icon-tabler-dots-vertical">
                <path stroke="none" d="M0 0h24v24H0z"/>
                <circle cx="12" cy="5" r="1"/>
                <circle cx="12" cy="12" r="1"/>
                <circle cx="12" cy="19" r="1"/>
              </svg>
            </button>


            {mostrarMenuOpciones &&
              <div

                className={"flex flex-col gap-2 bg-white p-3 rounded-md shadow-lg border border-gray-200"}>

                <BotonEliminar 
                  productoId={producto.id}
                  onDeleteSuccess={onDeleteProducto}/>
                <BotonActualizar enlace={`/CrearProducto?id=${producto.id}`}/>

              </div>
            }

          </div>
        }

      </div>




      {/* Detalles del producto */}
      {mostrarDetalles &&
        <div
          className="fixed w-screen h-screen bg-black bg-opacity-60 z-50 flex justify-center items-center top-0 right-0"
          onClick={(e) => handleMostrarDetalles(e)}>

          <div
            className="w-[800px] bg-white rounded-md h-fit] flex gap-7 p-7 "
            onClick={(e) => e.stopPropagation()}>

            {/* Imagen y categorias */}
            <div className="flex flex-col gap-4 w-2/3">
              <Image
                src={elegirImagen(producto)} alt={producto?.nombre}
                width={300}
                height={300}
                className="bg-no-repeat w-full h-fit object-cover rounded-md"
              />

              {/* Categorias del producto */}
              <div className="flex flex-wrap gap-2 w-full">

                {producto.categorias && producto.categorias.length > 0 && producto.categorias.map((categoria) => {

                  return (
                    <div key={categoria.idCategoria} onClick={(e) => {
                      handleMostrarDetalles(e)
                    }}>

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

    </>

  );
}


export {Producto};