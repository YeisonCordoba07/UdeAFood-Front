import React, {useEffect, useState} from 'react'
import {useAuth} from "@/context/AuthContext";

const InformacionTienda = (tienda) => {


  const {user, login, logout} = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [sendingHorario, setSendingHorario] = useState(false);

  const [horario, setHorario] = useState({
    horario1: "",
    horario2: "",
    idTienda: 0
  });
  const [editarHorario, setEditarHorario] = useState(false);


  useEffect(() => {
    const fetchHorario = async () => {
      try {
        const response = await fetch(`http://localhost:8080/horario/${user.id}`);
        const data = await response.json();
        console.log("data: ", data);
        setHorario(data); // Store the schedule in state
      } catch (error) {
        console.error("Error fetching horario:", error);
      }
    };

    fetchHorario();

  }, []);

  if (!tienda) return null;

  const infoTienda = tienda.tienda;


  function handleTimeChange(e) {
    e.preventDefault();
    const {name} = e.target;
    const value = e.target.value + ":00";
    setHorario(prevState => ({...prevState, [name]: value}));
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
    setHorario(user.horario);
  }


  // Hacer la solicitud para guardar el horario
  async function onChangeHorario(e) {
    e.preventDefault();
    setSendingHorario(true);

    try {

      const response = await fetch("http://localhost:8080/horario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...horario, idTienda: user.id})
      });

      if (response.ok) {
        setEditarHorario(false);
      }

    } catch (error) {

    } finally {
      setSendingHorario(false);
      await login(user.correo, user.clave);
    }
  }




  return (
    <>
      <button className='bg-green-600 py-2 px-5 h-10 text-white font-bold rounded-md hover:bg-green-700 transition-all duration-150 hover:scale-105 ease-in'
              onClick={() => setIsOpen(true)}>
        Información
      </button>
      {
        isOpen && (
          <div
            className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm items-center flex justify-center z-20'>

            <div className='bg-white p-8 rounded-lg flex flex-col justify-center items-center gap-7 w-[500px]'>

              <div className='flex flex-col w-full gap-1'>

                <div className="flex w-fit relative justify-center items-center">

                  <h3 className="text-xl font-bold mr-10">
                    Horarios
                  </h3>


                  {/* Botón para editar los horarios */}
                  {!editarHorario &&
                    <div
                      className={"bg-transparent hover:bg-green-300 w-10 h-10 flex justify-center items-center rounded-full absolute top-[-5px] right-[-10px] duration-100 transition-all cursor-pointer"}
                      onClick={() => setEditarHorario(true)}>

                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                           className=" text-green-600">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"/>
                        <path d="M13.5 6.5l4 4"/>
                      </svg>
                    </div>
                  }


                  {/* Botones para enviar o cancelar la edición del horario */}
                  {editarHorario &&
                    <div
                      className="flex gap-2  w-fit absolute top-1 bottom-0 right-[-40px] duration-100 transition-all cursor-pointer justify-center items-center ">
                      <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                           className="bg-white rounded-full text-green-500 hover:bg-lime-400 hover:text-green-600 hover:scale-110 transition-all duration-150"
                           onClick={(e) => handleSendEdit(e)}>
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
                        <path d="M9 12l2 2l4 -4"/>
                      </svg>

                      <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                           className="bg-white rounded-full text-red-500 hover:bg-red-400 hover:text-red-700 hover:scale-110 transition-all duration-150"
                           onClick={(e) => handleCancelEdit(e)}>
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 21a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9a9 9 0 0 0 9 9z"/>
                        <path d="M9 8l6 8"/>
                        <path d="M15 8l-6 8"/>
                      </svg>

                    </div>}
                </div>


                {/* REVISAR QUE TAN EFICIENTE ES ESTO - LOGIN */}
                {!editarHorario && <span className={"flex gap-1"}>
                  Lunes a viernes:
                  <span className={"font-medium text-green-700"}>
                    {horario.horario1} - {horario.horario2}
                  </span>
                </span>}

                {/* Input para seleccionar los horarios */}
                {editarHorario &&
                  <div className={"relative w-fit flex gap-3"}>
                    <label htmlFor="horario1" className={"font-medium"}>
                      Apertura
                      <input type={"time"}
                             className={"rounded-md bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 text-sm border-gray-300 p-2.5 w-fit hover:bg-green-200 hover:text-green-800 cursor-pointer"}
                             value={horario.horario1}
                             name="horario1"
                             id="horario1"
                             onChange={(e) => handleTimeChange(e)}
                      />
                    </label>

                    <label htmlFor="horario2" className={"font-semibold"}>
                      Cierre
                      <input type={"time"}
                             className={"rounded-md bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 text-sm border-gray-300 p-2.5 w-fit hover:bg-green-200 hover:text-green-800 cursor-pointer"}
                             value={horario.horario2}
                             name="horario2"
                             onChange={(e) => handleTimeChange(e)}
                      />
                    </label>
                  </div>
                }
                {/* Fin editar horario */}
              </div>


              <div className='flex flex-col w-full'>
                <h3 className="text-xl font-bold ">Dirección</h3>
                <span>{infoTienda.ubicacion || 'Ubicación no disponible'}</span>

              </div>


              <div className='flex flex-col w-full'>
                <h3 className="text-xl font-bold">Servicio Domicilio</h3>
                <span>{infoTienda.domicilio}</span>

              </div>


              <div className='flex flex-col w-full'>
                <h3 className="text-xl font-bold">Formas de pago</h3>
                <span>Ahorro  a la mano</span>
                <span>Nequi</span>

              </div>


              <div>
                <button
                  className='bg-gray-600 py-2 px-6 rounded-lg text-white font-semibold hover:scale-105 hover:bg-gray-700 transition-colors duration-200'
                  onClick={() => setIsOpen(false)}>
                  Cerrar
                </button>
              </div>


            </div>

          </div>
        )
      }


    </>
  )
}

export {InformacionTienda};