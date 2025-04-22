import { ElementoFormulario } from "@/components/registro/ElementoFormulario";
import {useEffect, useState} from "react";
import { useFetch } from "@/hook/useFetch";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

const FormularioCrearProducto = () => {
    const { user } = useAuth();
    const router = useRouter();

    const { id } = router.query;

    console.log("id query ", id);


    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        disponibilidad: "",
        categorias: [{ idCategoria: "" }],
        seccion: { id: "" },
        imagen: {id: 0, imagen: ""},
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Obtiene el primer archivo seleccionado
        const reader = new FileReader();

        reader.onloadend = () => {
            setNuevoProducto({ ...nuevoProducto, imagen: {id: 0, imagen: reader.result.split(",")[1] } }); // Convierte a base64 y actualiza el estado
        };

        if (file) {
            reader.readAsDataURL(file); // Lee la imagen como una URL de datos (base64)
        }
    };





    // Trae todas las categorias que exiten
    const { data: categoria } = useFetch("http://localhost:8080/Categoria");

    /* 
      Trae las secciones de la tienda que ha iniciado sesión
        y verifica si user está definido antes de usarlo
    */
    const { data: Seccion } = useFetch(user ? `http://localhost:8080/Seccion/${user.id}` : null);



    // Trae el producto que se va a editar
  useEffect(() => {
    if (!id) return;

    const fetchProducto = async () => {
      try {
        const res = await fetch(`http://localhost:8080/Producto/obtener/${id}`);
        if (!res.ok) throw new Error("Error al obtener el producto");

        const data = await res.json();

          setNuevoProducto({
            nombre: data.nombre,
            descripcion: data.descripcion,
            precio: data.precio,
            disponibilidad: data.disponibilidad,
            categorias: [],
            seccion: {  },
            imagen: { },
          });

      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    fetchProducto();

  }, [id]);



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
                if(response.includes("Producto creado")){
                    router.push(`/tienda/${user.id}`);
                }
            })
            .catch((error) => console.error("Error al crear Producto:", error));
    }

    
    const actualizaProducto=(e)=>{
        e.preventDefault();
        fetch(`http://localhost:8080/Producto/actualizar/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoProducto),
        })

        .then((response) => {
            console.log("Respuesta del servidor:", response);
            if(response.ok){
                router.push(`/tienda/${user.id}`);
            }
        })
        .catch((error) => console.error("Error al actualizar Producto:", error));

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
                    textoLabel={"Imagen"}
                    esRequerido={false}
                    type="file"
                    onChange={handleImageChange} 
                />

                <label
                    htmlFor="categorias"
                    className="flex gap-5 items-center justify-between ">

                    <span className="text-xl font-semibold">Categoria</span>

                    <select name="categorias" className="bg-neutral-200 px-5 py-2 rounded-lg text-xl outline-brack placeholder:text-neutral-500 w-96"
                        onChange={(e) => setNuevoProducto({
                            ...nuevoProducto,
                            categorias: [{idCategoria: e.target.value }]
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



              {!id && <button
                    type="submit"
                    className="bg-green-600 text-white font-bold text-xl py-2 rounded-lg hover:bg-green-600 hover:scale-105 duration-300">Crear Producto
                </button>}

              {id && <button
                    onClick={actualizaProducto}
                    type="button"
                    className="bg-green-600 text-white font-bold text-xl py-2 rounded-lg hover:bg-green-600 hover:scale-105 duration-300">Actualizar Producto
                </button>}

            </form>

        </div>
    );
}

export { FormularioCrearProducto };