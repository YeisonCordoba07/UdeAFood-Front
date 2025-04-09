import { useRouter } from "next/router";
import { Header } from "@/components/Header/Header";
import { SeccionTiendas } from "@/components/BarraSecciones/barraSecciones";
import { PerfilT } from "@/components/PerfilTienda/PerfilT";
import { Producto } from "@/components/producto/Producto";
import { useFetch } from "@/hook/useFetch";
import { BotonEliminar } from "@/components/Botones/BotonEliminar";




const TiendaParticular = ({}) => {
  const router = useRouter();

  const { id } = router.query;




  const {
    data: tienda,
    loading,
    error,
  } = useFetch(`http://localhost:8080/Tienda/${id}`);




  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="relative">
      <Header />

      <PerfilT tienda={tienda} />
      <SeccionTiendas secciones={tienda?.secciones || []} />




      {/*loading && <p>Cargando tiendas...</p>*/}
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
                    <div key={elementoProducto.id} className="relative">
                      <Producto producto={elementoProducto} />
                      <BotonEliminar productoId={elementoProducto.id} />
                  </div>
                  
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
