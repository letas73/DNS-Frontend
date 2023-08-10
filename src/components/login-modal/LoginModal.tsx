import React, { FC } from 'react'
import {  useForm } from 'react-hook-form'
import Modal from '../../ui/modal/Modal'
import { useAppDispatch } from '../../store/hooks'
import { AuthFormProps } from '../register-modal/RegisterModal'
import { fetchLogin } from '../../store/slices/auth'
import FormGroup from '@mui/material/FormGroup'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import './LoginModal.scss'

interface LoginModalProps {
  open: boolean
  onClose: () => void
}

const LoginModal: FC<LoginModalProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch()

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  })

  const onSubmit = (values: AuthFormProps) => {
    dispatch(fetchLogin(values))
    onClose()
  }

  return ( 
    <Modal visible={open} onClose={onClose} title='Авторизация'>
      <form onSubmit={handleSubmit(onSubmit)} className='auth-modal'>
        <FormControl component='fieldset' fullWidth>
          <FormGroup aria-label='position' row>
            <TextField
              className='auth-modal__input'
              id='E-mail'
              label='E-mail'
              InputLabelProps={{
                shrink: true,
              }}
              variant='filled'
              type='email'
              error={Boolean(errors.email?.message)}
              helperText={errors.email?.message}
              {...register('email', { required: 'Введите email' })}
              autoFocus
              fullWidth
            />
            <TextField
              id='password'
              label='Пароль'
              InputLabelProps={{
                shrink: true,
              }}
              variant='filled'
              type='password'
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              {...register('password', { required: 'Введите пароль' })}
              fullWidth
            />
            <Button className='auth-modal__submit' type='submit' variant='contained' fullWidth>
              Войти
            </Button>
            <br />
            <br />
            <br />
          </FormGroup>
        </FormControl>
      </form>
    </Modal>
  )
}

export default LoginModal