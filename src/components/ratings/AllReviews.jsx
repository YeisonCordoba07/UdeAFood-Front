import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

// Componente para crear/editar/eliminar reseña del usuario actual
const UserReviewForm = ({ userId, productId, existingReview, onSave, onDelete }) => {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [comment, setComment] = useState(existingReview?.comment || "");

  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating);
      setComment(existingReview.comment);
    }
  }, [existingReview]);

  const handleSave = () => {
    const review = { userId, productId, rating, comment };
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
            className={`text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
            onClick={() => setRating(star)}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
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
  if (!isOpen) return null;

  const { cliente } = useAuth();
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
  const userReview = cliente ? reviews.find(r => r.userId === cliente.id) : null;

  // Simulación de handlers
  const handleSaveReview = async (review) => {
    try {
        const nuevaCalificacion = {idUsuario: review.userId, idProducto: review.productId, calificacion: review.rating, comentario: review.comment};
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
