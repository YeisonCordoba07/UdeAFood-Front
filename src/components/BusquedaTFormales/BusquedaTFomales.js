import { Header } from "../Header/Header";
import { useFetch } from "@/hook/useFetch";

import BusquedaTiendas from "@/BusquedaTiendas/BusquedaTiendas";


{/* Borrar */}
const BusquedaTFomales = () => {
  const {
    data: tiendas,
    loading,
    error,
  } = useFetch("http://localhost:8080/Tienda/tipoTienda/FORMAL");

  if (error) return <p>Error al cargar las tiendas</p>; // Mostrar el error en caso de fallo

  return (
    <div className="flex flex-col items-center gap-5">
      <Header />

      <h1 className="text-4xl font-black text-green-900 uppercase text-center">
        TIENDAS FORMALES
      </h1>

      {loading ? (
        <p>Cargando tiendas formales...</p>
      ) : (
        <BusquedaTiendas tiendas={tiendas} />
      )}
    </div>
  );
};

export { BusquedaTFomales };
