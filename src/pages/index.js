import { Categorias } from "@/components/categorias/Categorias";
import Image from "next/image";
import abimagen from "@/../public/LogoUdeAFood.png";
import { HeaderRegistro } from "@/components/registro/HeaderRegistro";


export default function Home() {
    return (
        <div>
            <Categorias />
        </div>
    )
}