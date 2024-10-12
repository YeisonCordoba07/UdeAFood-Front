import { ElementoFormulario } from "@/components/registro/ElementoFormulario";
import { useState } from "react";
import { useFetch } from "@/hook/useFetch";
const FormularioCrearProducto = () => {

    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        disponibilidad: "",
        categorias: [{ idCategoria: "" }],
        seccion: { id: "" },
        imagen: null
    });

    const handleImageChange = (e) => {
        setNuevoProducto({ ...nuevoProducto, imagen: e.target.files[0] });
    };

    // Trae todas las categorias que exiten
    const { data: categoria } = useFetch("http://localhost:8080/Categoria");

    // Trae las secciones de la tienda 1
    const { data: Seccion } = useFetch("http://localhost:8080/Seccion/1");



    const crearTienda = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/Producto/crearProducto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoProducto),
        })
            .then((res) => {
                // Verificamos si el contenido es JSON
                const contentType = res.headers.get("Content-Type");
                if (contentType && contentType.includes("application/json")) {
                    return res.json(); // Si es JSON, lo procesamos
                } else {
                    return res.text(); // Si es texto, lo procesamos como texto
                }
            })
            .then((response) => {
                console.log("Respuesta del servidor:", response);
            })
            .catch((error) => console.error("Error al crear Producto:", error));
    }




    return (
        <div className="flex flex-col items-center gap-10">

            <h1 className="text-4xl font-black text-green-900 uppercase">Producto</h1>

            <form className="flex gap-3 flex-col w-[650px]" onSubmit={crearTienda}>

                <ElementoFormulario
                    identificador={"nombre"}
                    textoLabel={"Nombre del producto *"}
                    placeholderLabel={"Arboreo"}
                    esRequerido={true}
                    defaultValue={nuevoProducto.nombre}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
                />

                <ElementoFormulario
                    identificador={"descripcion"}
                    textoLabel={"Descripción *"}
                    placeholderLabel={"Vendemos todo tipo de comida"}
                    esRequerido={true}
                    defaultValue={nuevoProducto.descripcion}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })}
                />

                <ElementoFormulario
                    identificador={"precio"}
                    textoLabel={"Precio *"}
                    placeholderLabel={"5000"}
                    esRequerido={true}
                    type="number"
                    defaultValue={nuevoProducto.precio}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
                />
                <ElementoFormulario
                    identificador={"disponibilidad"}
                    textoLabel={"Disponibilidad"}
                    esRequerido={true}
                    placeholderLabel={"si o no"}
                    defaultValue={nuevoProducto.disponibilidad}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, disponibilidad: e.target.value })}
                />

                <ElementoFormulario
                    identificador={"imagen"}
                    textoLabel={"Imagen *"}
                    type="file"  // Cambiar el campo a tipo file
                    esRequerido={true}
                    onChange={handleImageChange}
                />

                <label
                    htmlFor="Categoria"
                    className="flex gap-5 items-center justify-between ">

                    <span className="text-xl font-semibold">Categoria</span>

                    <select name="categoria" className="bg-neutral-200 px-5 py-2 rounded-lg text-xl outline-brack placeholder:text-neutral-500 w-96"
                        onChange={(e) => setNuevoProducto({
                            ...nuevoProducto,
                            categorias: [{ idCategoria: e.target.value }]
                        })}>

                        <option value="default" selected>Seleccionar</option>
                        {categoria.map(categoria => {
                            return (
                                <option
                                    value={categoria.idCategoria}
                                    key={categoria.idCategoria}

                                >
                                    {categoria.nombreCategoria}
                                </option>
                            );

                        })}

                    </select>

                </label>


                <label
                    htmlFor="Sección"
                    className="flex gap-5 items-center justify-between ">

                    <span className="text-xl font-semibold">Sección</span>

                    <select name="seccion" className="bg-neutral-200 px-5 py-2 rounded-lg text-xl outline-brack placeholder:text-neutral-500 w-96"
                        onChange={(e) => setNuevoProducto({
                            ...nuevoProducto,
                            seccion: { id: e.target.value }
                        })}>
                        <option value="default" selected>Seleccionar</option>
                        {Seccion.map(Seccion => {
                            return (
                                <option
                                    value={Seccion.id}
                                    key={Seccion.id}>
                                    {Seccion.nombre}
                                </option>
                            );
                        })}

                    </select>


                </label>



                <button
                    type="submit"
                    className="bg-green-600 text-white font-bold text-xl py-2 rounded-lg hover:bg-green-600 hover:scale-105 duration-300">Crear Producto
                </button>

            </form>

        </div>
    );
}

export { FormularioCrearProducto };