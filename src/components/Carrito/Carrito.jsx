import { useCarrito } from "@/hook/useCarrito";
import { useClickAfuera } from "@/hook/useClickAfuera";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { IconoCarrito } from "../iconos/IconoCarrito";
import { elegirImagen } from "@/lib/elegirImagen";



const Carrito = () => {
  const { carrito, quitarDelCarrito } = useCarrito();

  const carritoRef = useRef(null);
  useClickAfuera(carritoRef, () => setMostrarCarrito(false));

  const [mostrarCarrito, setMostrarCarrito] = useState(false);




  return (
    <div className="relative" ref={carritoRef}>

      {/* Button to show cart details */}
      <button
        className="py-4 px-6 rounded-lg hover:bg-green-500 duration-300  transition hover:scale-110 p-2 cursor-pointer bg-transparent"
        onClick={() => setMostrarCarrito(!mostrarCarrito)}
      >
        <span className="text-white">
          <IconoCarrito/>
        </span>
      </button>



      {/* Cart item count */}
      {carrito.length > 0 && (
        <div className="absolute bottom-1 right-2 bg-black rounded-full w-5 h-5 flex justify-center items-center text-xs font-bold text-orange-400">
          {carrito.length}
        </div>
      )}




      {/* Cart details */}
      {mostrarCarrito && (
        <div className="absolute right-0 top-[105%]  w-72 h-fit bg-white rounded-lg menu-account-shadow border border-gray-100">

          <ul className="text-gray-800 pb-2 z-40">


            {carrito.length === 0 && (
              <div className="flex flex-col items-center justify-center w-full h-full p-4 text-gray-500">
                Carrito vacio
              </div>
            )}



            {/* Cart items */}
            {carrito.map((item) => {
              return (
                <li
                  key={item.idProducto}
                  className="flex gap-4 border-b p-4 border-neutral-200 "
                >
                  <Image
                     src={elegirImagen(item)}
                    alt={""}
                    width={80}
                    height={80}
                    className="bg-no-repeat object-cover rounded-md"
                  />

                  <div className="flex flex-col w-full  overflow-hidden h-full items-start">
                    <span className="text-md overflow-hidden text-ellipsis whitespace-nowrap w-full font-normal text-start">
                      {item.nombre}
                    </span>

                    <span className="text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap w-full text-start">
                      $ {item.precio}
                    </span>

                    <div>
                      <button
                        className="text-red-500 hover:text-red-700 transition duration-150"
                        onClick={() => quitarDelCarrito(item.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}


            {/* Button to open cart page */}
            <li className="flex gap-4 p-4 text-green-600 border-neutral-200 hover:bg-green-100 transition duration-150 hover:text-green-500 font-bold">
              <Link
                href="/cart"
                className="flex  justify-center items-center w-full"
              >
                Ver carrito / Ir a pagar
              </Link>
            </li>


          </ul>

        </div>
      )}
    </div>
  );
};

export { Carrito };
