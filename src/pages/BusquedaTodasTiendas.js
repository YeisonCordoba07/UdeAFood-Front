import { Header } from '@/components/Header/Header'
import { useFetch } from '@/hook/useFetch';
import { BotonConIcono } from '@/components/BotonConIcono';
import { MdInfoOutline } from 'react-icons/md';
import Image from 'next/image';
//import Image from "next/image";

const BusquedaTodasTiendas = () => {

    const{data:tiendas, loading, error} = useFetch('http://localhost:8080/Tienda/todas');
  return (
    <div>
         <Header/>
         <h1 className='text-center font-bold text-4xl'>TODAS</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {tiendas && tiendas.length > 0 ? (
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
                <span className="text-lg">{tienda.nombre}</span>
              </div>

              {/* Botón con ícono */}
              <BotonConIcono icono={<MdInfoOutline />} />
            </div>
          ))
        ) : (
          <p>No se encontraron tiendas</p>
        )}
      </div>
    </div>
  );
}

export default BusquedaTodasTiendas