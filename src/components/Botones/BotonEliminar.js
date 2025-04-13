import {useState} from 'react';

const BotonEliminar = ({productoId, onDeleteSuccess}) => {

  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/Producto/eliminar/${productoId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Error al eliminar el producto');
      }

      alert('Producto eliminado exitosamente');

      if (onDeleteSuccess) {
        onDeleteSuccess(productoId); // Puedes eliminarlo del estado del padre
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert(`No se pudo eliminar el producto: ${error.message}`);
    }finally {
      setMostrarConfirmacion(false);
    }
  };




  return (
    <>
      <button onClick={() => setMostrarConfirmacion(true)}
              className="bg-red-100 text-red-600 font-medium text-xs py-2 px-4 rounded-lg hover:bg-red-300 duration-200 transition-colors whitespace-nowrap flex flex-col items-center">
        Eliminar
      </button>


      {mostrarConfirmacion &&
        <div className={"flex w-screen h-screen bg-black/50 fixed top-0 left-0 z-50 justify-center items-center"}
        onClick={()=>setMostrarConfirmacion(false)}
        >
          <div className={"bg-white p-4 rounded-md shadow-lg"} onClick={(e)=>e.stopPropagation()}>
            <p className={"text-lg font-semibold mb-4"}>¿Estás seguro de que deseas eliminar este producto?</p>
            <div className={"flex gap-2 justify-center"}>
              <button onClick={() => setMostrarConfirmacion(false)}
                      className="bg-gray-200 text-gray-700 font-medium text-xs py-2 px-4 rounded-lg hover:bg-gray-400 duration-200 transition-colors whitespace-nowrap">
                Cancelar
              </button>
              <button onClick={handleDelete}
                      className="bg-red-500 text-white font-medium text-xs py-2 px-4 rounded-lg hover:bg-red-700 duration-200 transition-colors whitespace-nowrap">
                Confirmar
              </button>
            </div>
          </div>

        </div>}
    </>
  );
};

export {BotonEliminar};