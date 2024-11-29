import React from "react";
import { InformacionTienda } from "./InformacionTienda";
import { useAuth } from "@/context/AuthContext";

const PerfilT = ({ tienda }) => {
  const { user, logout } = useAuth(); // Usamos el hook para obtener el usuario y logout

  return (
    <div className="flex flex-[1] p-5 w-full justify-between gap-5 border-b-2">
      <img
        src={tienda.foto ? `data:image/jpeg;base64,${tienda.foto}` : "/all.jpg"}
        className="size-[80px] rounded-full"
        alt="logo"
      />
      <div className="flex flex-col w-full">
        <h1 className="text-4xl font-bold">
          {tienda.nombre || "Nombre de la Tienda"}{" "}
        </h1>
        <p className="justify-center">
          {tienda.descripcion || "Descripción de la tienda no disponible."}
        </p>
      </div>
      <InformacionTienda tienda={tienda} />
    </div>
  );
};

export { PerfilT };
