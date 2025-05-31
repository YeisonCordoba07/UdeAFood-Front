import React from 'react'
import { Header } from "@/components/Header/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { elegirImagen } from "@/lib/elegirImagen";
import Image from "next/image";


const perfilUsuario = () => {
  const router = useRouter();
  const [productosComprados, setProductosComprados] = useState([]);

  useEffect(() => {
    if (router.query.productos) {
      try {
        const productos = JSON.parse(router.query.productos);
        setProductosComprados(productos);
      } catch (error) {
        console.error("Error al leer productos:", error);
      }
    }
  }, [router.query]);

  return (
    <div>
      <Header />
      <h1 className="text-3xl font-bold my-5">Tus pedidos</h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {productosComprados.map((producto, index) => (
          <div key={index} className="flex justify-start gap-5 border p-5 rounded shadow bg-white w-fit">
            <Image src={elegirImagen(producto)} alt={producto.nombre} width={300} height={300}
                        className="bg-no-repeat h-full min-h-[100px] object-cover rounded-md w-1/4" />
            <div>
            <h2 className="text-lg font-bold">{producto.nombre}</h2>
            <p className="text-gray-500">{producto.descripcion}</p>
            <p className="text-green-600 font-bold">$ {producto.precio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default perfilUsuario