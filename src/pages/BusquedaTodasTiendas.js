import { Header } from '@/components/Header/Header'
import { useFetch } from '@/hook/useFetch';

const BusquedaTodasTiendas = () => {

    const{data:tiendas, loading, error} = useFetch('http://localhost:8080/Tienda/todas');
  return (
    <div>
         <Header/>

        <h1 className='text-center font-bold text-4xl'> TODAS LAS TIENDAS</h1>

        <ul className='flex flex-col font-bold'>
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
   

  )
}

export default BusquedaTodasTiendas