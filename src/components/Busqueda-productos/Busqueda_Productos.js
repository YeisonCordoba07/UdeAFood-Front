import React from 'react'
import { Header } from '../Header/Header';
import { Categorias } from '../categorias/Categorias';
import { Producto } from '../producto/Producto';

const Busqueda_Productos = () => {
  return (
    <div>
        <Header/>
        <Categorias/>
        <section className="flex gap-4 p-5 flex-wrap">
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

          <Producto
            imagen="/formal.jpg"
            nombre="Patel de carne"
            precio="4200" />

          <Producto
            imagen="/formal.jpg"
            nombre="Patel de carne"
            precio="4200" />


        </section>
    
    </div>
  )
}

export  {Busqueda_Productos};