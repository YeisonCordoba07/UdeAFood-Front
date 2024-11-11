import { useRouter } from "next/router";
import { Header } from "@/components/Header/Header";
import { SeccionTiendas } from "@/components/BarraSecciones/barraSecciones";
import { PerfilT } from "@/components/PerfilTienda/PerfilT";
import { Producto } from "@/components/producto/Producto";
import { InformacionTienda } from "@/components/PerfilTienda/InformacionTienda";
import { useFetch } from "@/hook/useFetch";


const imagenes = [
    "/burrito.jpg",
    "/empanada1.jpg",
    "/hamburguesa.jpg",
    "/pizza2.jpeg",
    "/pizza3.jpeg",
    "/pizza4.jpeg",
    "/pizza5.jpeg",
    "/polloasado.jpeg",
    "/sanduche.jpg",
    "/pasta1.jpeg",
    "/pasta2.jpeg",
    "/bandejapaisa.jpeg",
    "/sopa.jpeg",
    "/arepa.jpeg",
    "/pasaboca1.jpeg",
    "/pasaboca2.jpeg",
    "/cafe1.jpeg",
    "/cafe2.jpeg",
    "/arroz1.jpeg",
    "/arroz2.jpeg",
];



const TiendaParticular = ({}) => {
  const router = useRouter();

  const id = router.query.id;

  console.log(router.query);


    // Función para obtener una imagen aleatoria
    const obtenerImagenAleatoria = () => {
        const indiceAleatorio = Math.floor(Math.random() * imagenes.length);
        return imagenes[indiceAleatorio];
    };

    const {data: tienda, loading, error} = useFetch(`http://localhost:8080/Tienda/${id}`);

    if(loading) {
        return <div>Cargando...</div>
    }


  return (


    <div className="relative">
      <Header />

      <SeccionTiendas secciones={tienda?.secciones || []} />

      <PerfilT tienda={tienda} />

      <InformacionTienda tienda={tienda} />

      {loading && <p>Cargando tiendas...</p>}
      {error && <p>Error al cargar las tiendas</p>}
      <section className="flex flex-col p-5">
        {tienda?.secciones?.map((secciones) => {
          return (
            <section
              id={secciones.nombre} // Id para identificar la sección en la barra de navegación
              key={secciones.id} // Key para identificar la sección y desplazarse a ella
              className="flex flex-col gap-2 pt-5 pb-7 border-b border-gray-200"
              style={{ scrollMarginTop: "70px" }}
            >
              <h2 className={"text-2xl font-bold"}>{secciones.nombre}</h2>
              <div className="flex gap-4 mt-2 flex-wrap">
                {secciones.productos.map((elementoProducto) => {
                  return (
                    <Producto
                      key={elementoProducto.id}
                      imagen={obtenerImagenAleatoria()}
                      nombre={elementoProducto.nombre}
                      precio={elementoProducto.precio}
                    />
                  );
                })}
              </div>
            </section>
          );
        })}
      </section>
    </div>
  );
};

export default TiendaParticular;
