import { useBusquedaContext } from "@/atoms/busquedaContext";
import { useFetch } from "@/hook/useFetch";
import { useEffect, useState } from "react";

import BusquedaTiendas from "@/BusquedaTiendas/BusquedaTiendas";
import { Header } from "@/components/Header/Header";


const BuscarTienda = () => {
  const { data, setData } = useBusquedaContext();
  const [url, setUrl] = useState("");

  useEffect(() => {
    // Carga el valor del localStorage
    const tipoTienda = localStorage.getItem("tipo-tienda");
    if (data !== tipoTienda) {
      setData(tipoTienda);
    }

    if (data === "TODAS") {
      setUrl("http://localhost:8080/Tienda/todas");
    } else if (data === "FORMAL" || data === "INFORMAL") {
      setUrl(`http://localhost:8080/Tienda/tipoTienda/${data}`);
    }
  }, [data, setData]);


  
  // Hace la solicitud para traer los datos
  const { data: tiendas, loading, error } = useFetch(url);


  const obtenerTitulo = () => {
    switch (data) {
      case "FORMAL":
        return "TIENDAS FORMALES";
      case "INFORMAL":
        return "TIENDAS INFORMALES";
      case "TODAS":
        return "TODAS LAS TIENDAS";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">

      <Header />

      <h1 className="text-4xl font-black text-green-900 uppercase text-center">
        {obtenerTitulo()}
      </h1>

      {loading && <p>Cargando tiendas...</p>}
      {error && <p>Error al cargar las tiendas</p>}

      {tiendas && <BusquedaTiendas tiendas={tiendas} />}

    </div>
  );
};

export default BuscarTienda;
