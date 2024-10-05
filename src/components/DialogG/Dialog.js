import React, { Children } from 'react'
import { Dialog as Dialogmiu, DialogContent,DialogTitle } from '@mui/material';



const Dialog = ({open, onClose, title,children}) => {
  return (
    <Dialogmiu open={true} onClose={onclose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{Children}</DialogContent>
    </Dialogmiu>
  )
}

export {Dialog};

