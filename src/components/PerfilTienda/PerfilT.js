import React from "react";
import { InformacionTienda } from "./InformacionTienda";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

const PerfilT = ({ tienda }) => {
  const { user, logout } = useAuth(); // Usamos el hook para obtener el usuario y logout
  const router = useRouter();


  function handleEditarInformación(){
    router.push(`/registro?id=${tienda.id}`)
  }

  return (
    <div className="flex flex-[1] p-5 w-full justify-between gap-5 border-b-2">
      <img
        src={tienda.foto ? `data:image/jpeg;base64,${tienda.foto}` : "/all.jpg"}
        className="size-[80px] rounded-full"
        alt="logo"
      />
      <div className="flex flex-col w-full relative">
        <h1 className="text-4xl font-bold w-fit">
          {tienda.nombre || "Nombre de la Tienda"}{" "}
        </h1>

        <div
          className={
            "absolute right-0 top-0 bg-transparent hover:bg-green-300 w-10 h-10 flex justify-center items-center rounded-full duration-100 transition-all cursor-pointer"
          }
          onClick={handleEditarInformación}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className=" text-green-600"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
            <path d="M13.5 6.5l4 4" />
          </svg>
        </div>

        <p className="justify-center">
          {tienda.descripcion || "Descripción de la tienda no disponible."}
        </p>
      </div>
      <InformacionTienda tienda={tienda} />
    </div>
  );
};

export { PerfilT };
