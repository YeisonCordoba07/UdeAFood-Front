import React from 'react';

const BotonEliminar = ({ productoId, onDeleteSuccess }) => {
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
    }
  };

  return (
    <button onClick={handleDelete} className="bg-green-600 text-white font-medium text-xs py-2 px-4 rounded-lg hover:bg-green-500 duration-300 whitespace-nowrap flex flex-col items-center">
      Eliminar
    </button>
  );
};

export  {BotonEliminar };