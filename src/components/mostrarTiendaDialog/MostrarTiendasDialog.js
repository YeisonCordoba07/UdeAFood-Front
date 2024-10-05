import { Dialog } from '../DialogG/Dialog'

import React from 'react'

const MostrarTiendasDialog = ({open, setOpen}) => {
  return (
    <>
    <Dialog open={open}
    onClose={()=>{
        setOpen(false);
    }} 
    title='tiendas formales'
    >
        <div>Tiendas formales</div>
    </Dialog>
 

</>
  )
}

export {MostrarTiendasDialog} ;


