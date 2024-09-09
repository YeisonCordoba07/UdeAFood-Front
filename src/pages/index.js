import { Categorias } from "@/components/categorias/Categorias";
import Image from "next/image";
import abimagen from "@/../public/LogoUdeAFood.png";
import { HeaderRegistro } from "@/components/registro/HeaderRegistro";
import { Tienda } from "@/components/B-tiendas/tienda";


export default function Home() {
    return (
        <div>
            <Categorias />
            <Tienda />
        </div>
    )
}