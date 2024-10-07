import React from 'react'
import { Header } from '../Header/Header';
import { useFetch } from '@/hook/useFetch';

const BusquedaTFomales = ({nombre}) => {
  const{data:tiendas, loading, error} = useFetch('http://localhost:8080/Tienda/tipoTienda/FORMAL');
  return (
    <div>
      <Header/>
      <h1 className='text-center font-bold text-4xl'> TIENDAS FORMALES</h1>

      <ul className='flex flex-col'>
        {tiendas && tiendas.length > 0 ?(
          tiendas.map((tienda, index)=> (
            <li key={index} className='my-2'>
              <span>{tienda.nombre}</span>
            </li>
          ))
      ):(
        <p>No se encontraron tiendas</p>
      )}
      </ul>

    </div>
  );

}

export {BusquedaTFomales};