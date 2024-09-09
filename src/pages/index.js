import { Categorias } from "@/components/categorias/Categorias";
import { Tienda } from "@/components/B-tiendas/tienda";
import { Header } from "@/components/Header/Header";


export default function Home() {
    return (
        <div>
            <Header/>
            <Categorias />
            <Tienda />
        </div>
    )
}