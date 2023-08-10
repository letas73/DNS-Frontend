import React, { FC } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/CloseOutlined';
import './Modal.scss'

interface ModalProps {
  visible: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

const Modal: FC<ModalProps> = ({ visible, onClose, children, title }) => {
  return (
    <Dialog
      open={visible}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      className='modal'
    >
      <DialogTitle id="alert-dialog-title">
        <IconButton onClick={onClose} className='modal__close'>
          <CloseIcon />
        </IconButton>
        {title}
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Modal