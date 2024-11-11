import { Header } from '@/components/Header/Header'
import { useFetch } from '@/hook/useFetch';
import { BotonConIcono } from '@/components/BotonConIcono';
import { MdInfoOutline } from 'react-icons/md';
import Image from 'next/image';
import BusquedaTiendas from '@/BusquedaTiendas/BusquedaTiendas';
//import Image from "next/image";

const BusquedaTodasTiendas = () => {

    const { data: tiendas, loading, error } = useFetch('http://localhost:8080/Tienda/todas');

    if (error) return <p>Error al cargar las tiendas</p>;
    
    return (
        <div className="flex flex-col items-center gap-5">

            <Header />
            <h1 className="text-4xl font-black text-green-900 uppercase text-center">
                TODAS LAS TIENDAS
            </h1>

            {loading ? (
                <p>Cargando tiendas informales...</p>
            ) : (
                <BusquedaTiendas tiendas={tiendas} />
            )}
        </div>
    );
}

export default BusquedaTodasTiendas