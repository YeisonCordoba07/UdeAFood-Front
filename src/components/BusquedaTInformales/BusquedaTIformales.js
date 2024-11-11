import React from "react";
import { Header } from "../Header/Header";
import { useFetch } from "@/hook/useFetch";
import BusquedaTiendas from "@/BusquedaTiendas/BusquedaTiendas";


{/* Borrar */}
const BusquedaTIformales = () => {
  const {
    data: tiendas,
    loading,
    error,
  } = useFetch("http://localhost:8080/Tienda/tipoTienda/INFORMAL");

  if (error) return <p>Error al cargar las tiendas</p>;

  return (
    <div className="flex flex-col items-center gap-5">
      <Header />
      <h1 className="text-4xl font-black text-green-900 uppercase text-center">
        TIENDAS INFORMALES
      </h1>

      {loading ? (
        <p>Cargando tiendas informales...</p>
      ) : (
        <BusquedaTiendas tiendas={tiendas} />
      )}
    </div>
  );
};

export { BusquedaTIformales };
