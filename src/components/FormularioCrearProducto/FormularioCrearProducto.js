import { ElementoFormulario } from "@/components/registro/ElementoFormulario";

const FormularioCrearProducto = () => {


    const crearTienda = (e) => {
        e.preventDefault();
    }


    return (
        <div className="flex flex-col items-center gap-10">

            <h1 className="text-4xl font-black text-green-900">Crear Producto</h1>

            <form className="flex gap-3 flex-col w-[650px]" onSubmit={crearTienda}>

                <ElementoFormulario
                    identificador={"nombre"}
                    textoLabel={"Nombre del producto *"}
                    placeholderLabel={"Arboreo"}
                    esRequerido={true}
                />

                <ElementoFormulario
                    identificador={"descripcion"}
                    textoLabel={"Descripción *"}
                    placeholderLabel={"Vendemos todo tipo de comida"}
                    esRequerido={true}
                />

                <ElementoFormulario
                    identificador={"precio"}
                    textoLabel={"Precio *"}
                    placeholderLabel={"5000"}
                    esRequerido={true}
                    type="number"
                />

                <ElementoFormulario
                    identificador={"imagen"}
                    textoLabel={"Imagen"}
                    placeholderLabel={"https://www.imagen.com"}
                />

                <label
                    htmlFor="Categoria"
                    className="flex gap-5 items-center justify-between ">

                    <span className="text-xl font-semibold">Categoria</span>

                    <select name="Categoria" className="bg-neutral-200 px-5 py-2 rounded-lg text-xl outline-brack placeholder:text-neutral-500 w-96">
                        <option value="default" selected>Seleccionar</option>
                        <option value="value1">Value 1</option>
                        <option value="value2">Value 2</option>
                        <option value="value3">Value 3</option>
                    </select>

                </label>


                <label
                    htmlFor="Sección"
                    className="flex gap-5 items-center justify-between ">

                    <span className="text-xl font-semibold">Sección</span>

                    <select name="Categoria" className="bg-neutral-200 px-5 py-2 rounded-lg text-xl outline-brack placeholder:text-neutral-500 w-96">
                        <option value="default" selected>Seleccionar</option>
                        <option value="value1">Value 1</option>
                        <option value="value2">Value 2</option>
                        <option value="value3">Value 3</option>
                    </select>

                </label>



                <button
                    type="submit"
                    className="bg-green-500 text-white font-bold text-xl py-2 rounded-lg hover:bg-green-600 hover:scale-105 duration-300">Crear Producto
                </button>

            </form>

        </div>
    );
}

export {FormularioCrearProducto};