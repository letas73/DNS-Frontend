import React, { FC } from 'react'
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './AlertError.scss'

interface AlertErrorProps {
  message?: string
  onClose: () => void
}

const AlertError: FC<AlertErrorProps> = ({ message, onClose }) => {
  return (
    <Alert
      variant="filled"
      severity="error"
      className='alert-error'
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={onClose}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      {message}
    </Alert>
  )
}

export default AlertError