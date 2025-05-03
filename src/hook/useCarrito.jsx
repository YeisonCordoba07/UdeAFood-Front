import { carritoContext } from '@/atoms/CarritoContext';
import { useAtom } from 'jotai';


const useCarrito = () =>{

  const [carrito, setCarrito] = useAtom(carritoContext);



  const agregarAlCarrito = (item) => {

    if(carrito.some(newItem => newItem.id === item.id)){
        return;
    }
    setCarrito(prev => [...prev, item]);
  };


  const quitarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  const vaciarCarrito = ()=>{
    setCarrito([]);
  }

  return { carrito, agregarAlCarrito, quitarDelCarrito, vaciarCarrito };
}

export {useCarrito}
