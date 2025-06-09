import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

// Componente para crear/editar/eliminar reseña del usuario actual
const UserReviewForm = ({ userId: idUsuario, productId: idProducto, existingReview, onSave, onDelete }) => {

  const [calificacion, setCalificacion] = useState(existingReview?.calificacion || 0);
  const [comentario, setComentario] = useState(existingReview?.comentario || "");



  useEffect(() => {
    if (existingReview) {
      setCalificacion(existingReview.calificacion);
      setComentario(existingReview.comentario);
    }
  }, [existingReview]);


  const handleSave = () => {
    const review = { idUsuario, idProducto, calificacion, comentario };
    onSave(review);
  };


  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de eliminar tu calificación?")) {
      onDelete(existingReview.id);
    }
  };



  return (
    <div className="border p-4 rounded bg-gray-50 mt-6">
      <h4 className="font-semibold mb-2">Tu calificación</h4>
      <div className="mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`text-2xl ${star <= calificacion ? "text-yellow-500" : "text-gray-300"}`}
            onClick={() => setCalificacion(star)}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="Escribe un comentario..."
        className="w-full border rounded p-2 mb-2"
      />
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {existingReview ? "Actualizar" : "Enviar"}
        </button>
        {existingReview && (
          <button
            onClick={handleDelete}
            className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};





const AllReviews = ({ isOpen, onClose, reviews = [], productId }) => {

  const { cliente } = useAuth();
  const [userReview, setUserReview] = useState(null);
  const [puedeHacerReview, setPuedeHacerReview] = useState(false);


  const average = 4.6;
  const total = 7498;

  // Calcular distribución simulada
  const distribution = {
    5: 79.5,
    4: 10.1,
    3: 4,
    2: 2.5,
    1: 3.9,
  };

  // Reseña actual del cliente
  useEffect(() => {
    const fetchUserReview = async () => {
      if (cliente && productId) {
        try {
          const response = await fetch(`http://localhost:8080/calificacion/${cliente.id}/${productId}`);
          if (response.ok) {
            const data = await response.json();
            setUserReview(data);
            console.log("Reseña del usuario:", data);
          } else {
            setUserReview(null);
          }
        } catch (error) {
          setUserReview(null);
        }
      }
    };
    fetchUserReview();
  }, [cliente, productId]);



  
  if (!isOpen) return null;

  
  // Simulación de handlers
  const handleSaveReview = async (review) => {

    const res = await fetch(`http://localhost:8080/pedido/${cliente.id}/${productId}`);
    
    if (!res.ok) {return;}
    const idPedido = await res.text();
    console.log("ID del pedido:", idPedido);

    if(!idPedido || idPedido <= 0) {
        return;
    }


    try {
        const nuevaCalificacion = {
            idUsuario: review.idUsuario, 
            idProducto: productId, 
            idPedido: idPedido,
            calificacion: review.calificacion, 
            comentario: review.comentario
        };

        const response = await fetch("http://localhost:8080/calificacion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevaCalificacion),
        });
        if (!response.ok) {
            throw new Error("Error al enviar la calificación");
        }
        const data = await response.json();
        console.log("Calificación enviada:", data);

        
    } catch (error) {
        console.log("error al enviar la calificacion: ", error)
        
    }
    console.log("Guardar reseña:", review);
    // Aquí iría un POST o PUT al backend
  };



  const handleDeleteReview = (reviewId) => {
    console.log("Eliminar reseña con ID:", reviewId);
    // Aquí iría un DELETE al backend
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Reseñas de artículos</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black text-xl">✕</button>
        </div>

        <div className="mb-6 border-b pb-4">
          <p className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded w-fit">✅ Todas las reseñas son de compras verificadas</p>
          <div className="flex items-center gap-6 mt-4">
            <div className="text-5xl font-bold text-yellow-500">★ {average}</div>
            <div className="flex flex-col gap-1 w-full">
              {[5, 4, 3, 2, 1].map(star => (
                <div key={star} className="flex items-center gap-2">
                  <span className="w-6 text-sm">{star}★</span>
                  <div className="w-full bg-gray-200 rounded h-3">
                    <div
                      className="bg-yellow-400 h-3 rounded"
                      style={{ width: `${distribution[star]}%` }}
                    ></div>
                  </div>
                  <span className="text-sm w-12 text-right">{distribution[star]}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Formulario para el usuario autenticado */}
        {cliente && (
          <UserReviewForm
            userId={cliente.id}
            productId={productId}
            existingReview={userReview}
            onSave={handleSaveReview}
            onDelete={handleDeleteReview}
          />
        )}

        {/* Lista de reseñas */}
        <div className="space-y-4 mt-6">
          {reviews.length > 0 ? (
            reviews.map((r, index) => (
              <div key={index} className="border-b pb-2">
                <p className="font-medium text-sm text-gray-800">{r.nombreUsuario}</p>
                <p className="text-yellow-500 text-sm">
                  {'★'.repeat(r.calificacion)}{'☆'.repeat(5 - r.calificacion)}
                </p>
                <p className="text-gray-700 text-sm">{r.comentario}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No hay comentarios aún.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllReviews;
