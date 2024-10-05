import { Dialog } from '../DialogG/Dialog'

import React from 'react'

const mostrarTiendasDialog = ({open, setOpen}) => {
  return (
    <>
    <Dialog open={true} 
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

export {mostrarTiendasDialog} ;


