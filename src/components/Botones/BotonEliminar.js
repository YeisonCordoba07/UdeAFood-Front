import React from 'react';

const BotonEliminar = ({ productoId, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/productos/eliminar/${productoId}`, {
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
    <button onClick={handleDelete} className="text-red-600 hover:underline">
      Eliminar
    </button>
  );
};

export  {BotonEliminar };