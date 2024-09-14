import { Header } from "@/components/Header/Header";

const { Producto } = require("@/components/producto/Producto");


const PerfilTienda = () => {

    return (

        <div>
            <Header />
            
            <section className="flex gap-4 p-5 flex-wrap">

                <Producto />

                <Producto
                    imagen="/udeafood.jpg"
                    nombre="Hamburguesa de Pollo"
                    precio="5800" />

                <Producto
                    imagen="/informal.jpg"
                    nombre="Patel de carne hojaldrada horno"
                    precio="4200" />

                <Producto
                    imagen="/formal.jpg"
                    nombre="Patel de carne"
                    precio="4200" />
            </section>

        </div>

    );
}


export default PerfilTienda;