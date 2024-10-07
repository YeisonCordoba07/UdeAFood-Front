import { Dialog } from '../DialogG/Dialog'

import React from 'react'

const MostrarTiendasDialog = ({open, setOpen}) => {
  return (
    <>
    <Dialog open={open} 
    onClose={()=>{
        setOpen(false);
    }} 
    title='Tiendas nueva'
    >
        <div>
            <h1>lista de tiendas</h1>

            <button onClick={()=>setOpen(false)}>
            Cerrar
            </button>
        </div>
    </Dialog>
 

</>
  )
}

export {MostrarTiendasDialog} ;


