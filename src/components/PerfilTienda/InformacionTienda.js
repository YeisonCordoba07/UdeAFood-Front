import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const InformacionTienda = (tienda) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sendingHorario, setSendingHorario] = useState(false);
  const [borrarIsOpen, setBorrarIsOpen] = useState(false);
  const [puedeEditar, setPuedeEditar] = useState(false);
  const { user } = useAuth();


  const [horario, setHorario] = useState({
    horario1: "",
    horario2: "",
    idTienda: 0,
  });
  const [editarHorario, setEditarHorario] = useState(false);
  const infoTienda = tienda.tienda;
  //console.log("infotienda:", infoTienda);

  //Metodo de pago
  const [mostrarFormMetodo, setMostrarFormMetodo] = useState(false);
  const [metodosPago, setMetodosPago] = useState([]);
  const [nuevoMetodo, setNuevoMetodo] = useState({
    tipo: '',
    detalles: ''
  });


  {/* Verificar que solo el usuario pueda editar */ }
  useEffect(() => {
    if (user?.id === infoTienda?.id) {
      setPuedeEditar(true);
    }
  }, [infoTienda, user]);



  useEffect(() => {
    const fetchHorario = async () => {

      if (!infoTienda?.id) return;

      try {
        const response = await fetch(
          `http://localhost:8080/horario/${infoTienda.id}`
        );

        // Verifica si la respuesta tiene contenido
        const text = await response.text();
        if (!text) {
          return;
        }

        const data = JSON.parse(text);


        setHorario({
          horario1: data.horario1 || "",
          horario2: data.horario2 || "",
          idTienda: data.idTienda || 0,
        });

      } catch (error) {
        console.error("Error fetching horario:", error);
      }
    };


    fetchHorario();

  }, [infoTienda]);

  console.log("Horario después:", infoTienda.horario);



  if (!tienda) return null;



  // Actualiza el estado cada vez que se cambie el valor del horario
  function handleTimeChange(e) {
    e.preventDefault();
    const { name } = e.target;
    const value = e.target.value + ":00";
    setHorario((prevState) => ({ ...prevState, [name]: value }));
  }

  // Enviar los cambios hechos en el horario
  function handleSendEdit(e) {
    e.preventDefault();
    onChangeHorario(e);
    setEditarHorario(false);
  }

  // Cancelar los cambios hechos en el horario
  function handleCancelEdit() {
    setEditarHorario(false);
    setHorario(infoTienda.horario);
  }



  // Hacer la solicitud para guardar el horario
  async function onChangeHorario(e) {
    e.preventDefault();
    setSendingHorario(true);

    // Verifica que solo el dueño de la tienda pueda editar  
    if (!puedeEditar) {
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/horario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...horario, idTienda: infoTienda.id }),
      });
      if (response.ok) {
        console.log("Horario cambiado o creado exitosamente");
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setSendingHorario(false);

      //CUANDO SE ACTUALIZA EL VALOR, INFOTIENDA NO CAMBIA, ENTONCES CARGA EL VALOR VIEJO
      //await login(user.correo, user.clave);
    }
  }



  async function borrarHorario() {

    // Verifica que solo el dueño de la tienda puede borrar  
    if (!puedeEditar) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/Tienda/horario/${infoTienda.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Horario borrado con exito");
      }
    } catch (error) {
      console.log("Error al eliminar horario: ", error);
    }
  }

// Cargar métodos al inicio (en el useEffect principal)
useEffect(() => {
  const fetchMetodosPago = async () => {
    try {
      const response = await fetch(`http://localhost:8080/tiendas/${infoTienda.id}/metodos-pago`);
      const data = await response.json();
      setMetodosPago(data);
    } catch (error) {
      console.error("Error cargando métodos de pago:", error);
    }
  };
  
  if (infoTienda?.id) {
    fetchMetodosPago();
  }
}, [infoTienda]);

// Agregar nuevo método de pago
const agregarMetodoPago = async () => {
  if (!nuevoMetodo.tipo || !nuevoMetodo.detalles) return;

  try {
    const response = await fetch(`http://localhost:8080/tiendas/${infoTienda.id}/metodos-pago`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoMetodo)
    });

    if (response.ok) {
      const data = await response.json();
      setMetodosPago([...metodosPago, data]);
      setNuevoMetodo({ tipo: '', detalles: '' });
      setMostrarFormMetodo(false);
    }
  } catch (error) {
    console.error("Error agregando método de pago:", error);
  }
};

// Eliminar método de pago
const eliminarMetodoPago = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/tiendas/${infoTienda.id}/metodos-pago/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      setMetodosPago(metodosPago.filter(m => m.id !== id));
    }
  } catch (error) {
    console.error("Error eliminando método de pago:", error);
  }
};



  return (
    <>
      <button
        className="bg-green-600 py-2 px-5 h-10 text-white font-bold rounded-md hover:bg-green-700 transition-all duration-150 hover:scale-105 ease-in"
        onClick={() => setIsOpen(true)}
      >
        Información
      </button>



      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm items-center flex justify-center z-20">
          <div className="bg-white p-8 rounded-lg flex flex-col justify-center items-center gap-7 w-[500px]">
            <div className="flex flex-col w-full gap-1">
              <div className="flex w-fit relative justify-center items-center">
                <h3 className="text-xl font-bold mr-10">Horarios</h3>

                {/* Botón para editar los horarios */}
                {!editarHorario && puedeEditar && (
                  <div className="absolute top-[-5px] right-[-60px] flex gap-1">
                    <div
                      className={
                        "bg-transparent hover:bg-green-300 w-10 h-10 flex justify-center items-center rounded-full duration-100 transition-all cursor-pointer"
                      }
                      onClick={() => setEditarHorario(true)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className=" text-green-600"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                        <path d="M13.5 6.5l4 4" />
                      </svg>
                    </div>

                    <div
                      className={`bg-transparent hover:bg-red-300 w-10 h-10 flex justify-center   items-center rounded-full duration-100 transition-all cursor-pointer ${horario.horario1 === "" || horario.horario2 === "" || horario === null
                        ? "pointer-events-none opacity-50 text-gray-400 bg-gray-200"
                        : "text-red-500"
                        }`}
                      onClick={() => setBorrarIsOpen(true)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className=""
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 7l16 0" />
                        <path d="M10 11l0 6" />
                        <path d="M14 11l0 6" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>


              {/* REVISAR QUE TAN EFICIENTE ES ESTO - LOGIN */}
              {!editarHorario && (
                <span className={"flex gap-1"}>
                  Lunes a viernes:
                  <span className={"font-medium text-green-700"}>
                    {infoTienda.horario
                      ? `${infoTienda.horario.horario1} - ${infoTienda.horario.horario2}`
                      : "Sin horario"}
                  </span>
                </span>
              )}


              {/* Input para seleccionar los horarios */}
              {editarHorario && puedeEditar && (
                <div className={"relative w-fit flex gap-3"}>
                  <label htmlFor="horario1" className={"font-medium"}>
                    Apertura
                    <input
                      type={"time"}
                      className={
                        "rounded-md bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 text-sm border-gray-300 p-2.5 w-fit hover:bg-green-200 hover:text-green-800 cursor-pointer"
                      }
                      value={horario?.horario1 ?? ""}
                      name="horario1"
                      id="horario1"
                      onChange={(e) => handleTimeChange(e)}
                    />
                  </label>

                  <label htmlFor="horario2" className={"font-semibold"}>
                    Cierre
                    <input
                      type={"time"}
                      className={
                        "rounded-md bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 text-sm border-gray-300 p-2.5 w-fit hover:bg-green-200 hover:text-green-800 cursor-pointer"
                      }
                      value={horario?.horario2 ?? ""}
                      name="horario2"
                      id="horario2"
                      onChange={(e) => handleTimeChange(e)}
                    />
                  </label>

                  {/* Botones para enviar o cancelar la edición del horario */}
                  {editarHorario && puedeEditar && (
                    <div className="flex gap-3 h-16  w-fitduration-100 transition-all cursor-pointer justify-center items-end ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={35}
                        height={35}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="bg-white rounded-full text-green-500 hover:bg-lime-400 hover:text-green-600 hover:scale-110 transition-all duration-150"
                        onClick={(e) => handleSendEdit(e)}
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                        <path d="M9 12l2 2l4 -4" />
                      </svg>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={35}
                        height={35}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="bg-white rounded-full text-red-500 hover:bg-red-400 hover:text-red-700 hover:scale-110 transition-all duration-150"
                        onClick={(e) => handleCancelEdit(e)}
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 21a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9a9 9 0 0 0 9 9z" />
                        <path d="M9 8l6 8" />
                        <path d="M15 8l-6 8" />
                      </svg>
                    </div>
                  )}
                </div>
              )}
              {/* Fin editar horario */}
            </div>





            <div className="flex flex-col w-full">
              <h3 className="text-xl font-bold ">Dirección</h3>
              <span>{infoTienda.ubicacion || "Ubicación no disponible"}</span>
            </div>

            <div className="flex flex-col w-full">
              <h3 className="text-xl font-bold">Servicio Domicilio</h3>
              <span>{infoTienda.domicilio}</span>
            </div>


            {/*Metodos de Pago*/}
            <div className="flex flex-col w-full">
              <div className="flex w-fit relative justify-center items-center">
                <h3 className="text-xl font-bold mr-10">Métodos de Pago</h3>

                {/* Botón para agregar métodos */}
                {puedeEditar && (
                  <div className="absolute top-[-5px] right-[-60px]">
                    <div
                      className="bg-transparent hover:bg-blue-300 w-10 h-10 flex justify-center items-center rounded-full duration-100 transition-all cursor-pointer"
                      onClick={() => setMostrarFormMetodo(!mostrarFormMetodo)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 5l0 14" />
                        <path d="M5 12l14 0" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Lista de métodos existentes */}
              <div className="mt-2 space-y-2">
                {metodosPago.length > 0 ? (
                  metodosPago.map((metodo) => (
                    <div key={metodo.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                      <span>
                        <strong>{metodo.tipo}:</strong> {metodo.detalles}
                      </span>
                      {puedeEditar && (
                        <button
                          onClick={() => eliminarMetodoPago(metodo.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={18}
                            height={18}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 7l16 0" />
                            <path d="M10 11l0 6" />
                            <path d="M14 11l0 6" />
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <span className="text-gray-500">No hay métodos registrados</span>
                )}
              </div>

              {/* Formulario para agregar nuevo método */}
              {mostrarFormMetodo && puedeEditar && (
                <div className="mt-3 p-3 bg-gray-100 rounded-lg">
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Tipo (ej: Tarjeta)"
                      className="flex-1 p-2 border rounded"
                      value={nuevoMetodo.tipo}
                      onChange={(e) => setNuevoMetodo({ ...nuevoMetodo, tipo: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Detalles (ej: Visa ****1234)"
                      className="flex-1 p-2 border rounded"
                      value={nuevoMetodo.detalles}
                      onChange={(e) => setNuevoMetodo({ ...nuevoMetodo, detalles: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      onClick={agregarMetodoPago}
                    >
                      Guardar
                    </button>
                    <button
                      className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                      onClick={() => setMostrarFormMetodo(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>


            {/* Botón para cerrar el dialog o modal */}
            <div>
              <button
                className="bg-gray-600 py-2 px-6 rounded-lg text-white font-semibold hover:scale-105 hover:bg-gray-700 transition-colors duration-200"
                onClick={() => {
                  setIsOpen(false);
                  handleCancelEdit(false);
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}





      {/* Ventana de confirmación para borrar un horario */}
      {borrarIsOpen && puedeEditar && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm items-center flex justify-center z-30">
          <div className="bg-white p-8 rounded-lg flex flex-col justify-center items-center gap-7 w-[500px]">
            <span className="font-bold text-2xl">¿Borrar horario?</span>

            <div className="flex gap-5">
              <button
                className="bg-red-600 py-2 px-6 rounded-lg text-white font-semibold hover:scale-105 hover:bg-red-700 transition-colors duration-200"
                onClick={() => {
                  borrarHorario();
                  setBorrarIsOpen(false);
                }}
              >
                Borrar
              </button>

              <button
                className="bg-gray-600 py-2 px-6 rounded-lg text-white font-semibold hover:scale-105 hover:bg-gray-700 transition-colors duration-200"
                onClick={() => {
                  setBorrarIsOpen(false);
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { InformacionTienda };
