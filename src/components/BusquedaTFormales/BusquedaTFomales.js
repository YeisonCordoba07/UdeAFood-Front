import { Header } from '../Header/Header';
import { useFetch } from '@/hook/useFetch';
import { BotonConIcono } from '../BotonConIcono';
import { MdInfoOutline } from "react-icons/md";
import Image from "next/image";


const BusquedaTFomales = () => {
  const { data: tiendas, loading, error } = useFetch('http://localhost:8080/Tienda/tipoTienda/FORMAL');

  if (loading) return <p>Cargando...</p>; // Mostrar un indicador de carga
  if (error) return <p>Error al cargar las tiendas</p>; // Mostrar el error en caso de fallo

  return (
    <div>
      <Header />
      <h1 className='text-center font-bold text-4xl'>TIENDAS FORMALES</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {tiendas && tiendas.length > 0 ? (
          tiendas.map((tienda) => (
            <div key={tienda.id} className="flex flex-col w-[290px] h-[380px] p-4 border border-gray-100 rounded-lg font-bold gap-4 items-start shadow-lg">
              
              {/* Imagen de la tienda */}
              <Image 
                src={tienda.imagen || "/all.jpg"} // Puedes ajustar para usar tienda.imagen si está disponible
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
          <p>No se encontraron tiendas formales</p>
        )}
      </div>
    </div>
  );
}

export {BusquedaTFomales};