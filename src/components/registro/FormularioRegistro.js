const FormularioRegistro = () => {
    return (
        <form className="flex gap-3 flex-col w-[650px]">


            <label 
            htmlFor="nombre" 
            className="flex gap-5 items-center justify-between ">

                <span className="text-xl font-semibold">Nombre de la tienda</span>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Ejm: Tienda de la esquina"
                    className="bg-neutral-200 px-5 py-2 rounded-lg text-xl outline-brack placeholder:text-neutral-500 w-96"
                />
            </label>


            <label 
            htmlFor="correo" 
            className="flex gap-5 items-center justify-between">

                <span className="text-xl font-semibold">Correo</span>
                <input
                    type="text"
                    id="correo"
                    name="correo"
                    placeholder="exmaple@gmail.com"
                    className="bg-neutral-200 px-5 py-2 rounded-lg text-xl outline-brack placeholder:text-neutral-500 w-96"
                />
            </label>

            <label htmlFor="clave" className="flex gap-5 items-center justify-between">

                <span className="text-xl font-semibold">Contraseña</span>
                <input
                    type="text"
                    id="clave"
                    name="clave"
                    placeholder="Clave"
                    className="bg-neutral-200 px-5 py-2 rounded-lg text-xl outline-brack placeholder:text-neutral-500 w-96"
                />
            </label>

            <label htmlFor="descripcion" className="flex gap-5 items-center justify-between">

                <span className="text-xl font-semibold">Descripción</span>
                <input
                    type="text"
                    id="descripcion"
                    name="descripcion"
                    placeholder="Vendemos comida rapida"
                    className="bg-neutral-200 px-5 py-2 rounded-lg text-xl outline-brack placeholder:text-neutral-500 w-96"
                />
            </label>

            <label htmlFor="foto" className="flex gap-5 items-center justify-between">

                <span className="text-xl font-semibold">Foto</span>
                <input
                    type="text"
                    id="foto"
                    name="foto"
                    placeholder="foto"
                    className="bg-neutral-200 px-5 py-2 rounded-lg text-xl outline-brack placeholder:text-neutral-500 w-96"
                />
            </label>

            <label htmlFor="ubicacion" className="flex gap-5 items-center justify-between">

                <span className="text-xl font-semibold">Ubicación</span>
                <input
                    type="text"
                    id="ubicacion"
                    name="ubicacion"
                    placeholder="Frente al bloque 19"
                    className="bg-neutral-200 px-5 py-2 rounded-lg text-xl outline-brack placeholder:text-neutral-500 w-96"
                />
            </label>

            <label htmlFor="formas-de-pago" className="flex gap-5 items-center justify-between">

                <span className="text-xl font-semibold">Formas de pago</span>
                <input
                    type="text"
                    id="formas-de-pago"
                    name="formas-de-pago"
                    placeholder="Visa, Mastercard, Efectivo"
                    className="bg-neutral-200 px-5 py-2 rounded-lg text-xl outline-brack placeholder:text-neutral-500 w-96"
                />
            </label>

            <label htmlFor="contacto" className="flex gap-5 items-center justify-between">

                <span className="text-xl font-semibold">Información de contacto</span>
                <input
                    type="text"
                    id="contacto"
                    name="contacto"
                    placeholder="+57 123 456 7890"
                    className="bg-neutral-200 px-5 py-2 rounded-lg text-xl outline-brack placeholder:text-neutral-500 w-96"
                />
            </label>


        </form>
    );
}

export { FormularioRegistro };