import React, { Children } from 'react'
import { Dialog as Dialogmiu, DialogContent,DialogTitle } from '@mui/material';



const Dialog = ({open, onClose, title,children}) => {
  return (
    <Dialogmiu open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
    </Dialogmiu>
  )
}

export {Dialog};

