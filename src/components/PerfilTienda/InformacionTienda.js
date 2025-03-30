import React, {useState} from 'react'

const InformacionTienda = (tienda) => {


  const [isOpen, setIsOpen] = useState(false);
  const [horario, setHorario] = useState("");
  const [editarHorario, setEditarHorario] = useState(false);

  if (!tienda) return null;

  const infoTienda = tienda.tienda;

  function handleTimeChange(e) {
    e.preventDefault();
    setHorario(e.target.value);
    console.log("time", e.target.value);
  }

  return (
    <>
      <button className='bg-green-600 py-2 px-5 h-10 rounded-sm text-white font-bold'
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

                  <h3 className="text-xl font-semibold mr-10">
                    Horarios
                  </h3>
                  {!editarHorario && <div className={"bg-white hover:bg-green-300 w-10 h-10 flex justify-center items-center rounded-full absolute top-[-5px] right-[-10px] duration-100 transition-all cursor-pointer"} onClick={()=>setEditarHorario(true)}>

                    <svg xmlns="http://www.w3.org/2000/svg"
                         width={24}
                         height={24}
                         viewBox="0 0 24 24"
                         fill="none"
                         stroke="currentColor"
                         strokeWidth={2}
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         className=" text-green-600">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"/>
                      <path d="M13.5 6.5l4 4"/>
                    </svg>
                  </div>}

                  {editarHorario &&
                    <div className="flex gap-2  w-fit absolute top-1 bottom-0 right-[-30px] duration-100 transition-all cursor-pointer justify-center items-center ">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width={30}  height={30}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="bg-white rounded-full text-green-500 hover:bg-lime-400 hover:text-green-600 hover:scale-110 transition-all duration-150">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l2 2l4 -4" />
                    </svg>

                    <svg  xmlns="http://www.w3.org/2000/svg"  width={30}  height={30}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="bg-white rounded-full text-red-500 hover:bg-red-400 hover:text-red-800 hover:scale-110 transition-all duration-150" onClick={()=>setEditarHorario(false)}>
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 21a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9a9 9 0 0 0 9 9z" /><path d="M9 8l6 8" /><path d="M15 8l-6 8" />
                    </svg>

                  </div>}
                </div>

                {!editarHorario && <span>Lunes-viernes: 8am - 8pm</span>}

                {editarHorario && <div className={"relative w-fit"}>
                  <input type={"time"}
                         className={"rounded-md bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 text-sm border-gray-300 p-2.5 w-fit hover:bg-green-200 hover:text-green-800 cursor-pointer"}
                         value={horario}
                         onChange={handleTimeChange}
                  />
                </div>}

                <form className="max-w-[8rem] mx-auto">

                </form>

              </div>

              <div className='flex flex-col w-full'>
                <h3 className="text-xl font-semibold ">Dirección</h3>
                <span>{infoTienda.ubicacion || 'Ubicación no disponible'}</span>

              </div>

              <div className='flex flex-col w-full'>
                <h3 className="text-xl font-semibold">Servicio Domicilio</h3>
                <span>{infoTienda.domicilio}</span>

              </div>

              <div className='flex flex-col w-full'>
                <h3 className="text-xl font-semibold">Formas de pago</h3>
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