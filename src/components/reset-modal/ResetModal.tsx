import React, { FC } from 'react'
import Modal from '../../ui/modal/Modal'
import FormGroup from '@mui/material/FormGroup'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import './ResetModal.scss'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '../../store/hooks'
import { fetchReset } from '../../store/slices/auth'

interface ResetModalProps {
  open: boolean
  onClose: () => void
}

export interface ValuesFormParams {
  email: string
  password: string
  password_2: string
}

const ResetModal: FC<ResetModalProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch()

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      password_2: ''
    },
    mode: 'onChange'
  })

  const onSubmit = (values: ValuesFormParams) => {
    dispatch(fetchReset(values))
    onClose()
  }

  return (
    <Modal visible={open} onClose={onClose} title='Сменить Пароль'>
      <form onSubmit={handleSubmit(onSubmit)} className='reset-modal'>
        <FormControl component='fieldset' fullWidth>
          <FormGroup aria-label='position' row>
            <TextField
              className='reset-modal__input'
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
              className='reset-modal__input'
              id='password'
              label='Введите новый пароль'
              InputLabelProps={{
                shrink: true,
              }}
              variant='filled'
              type='password'
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              {...register('password', { required: 'Введите новый пароль' })}
              fullWidth
            />
            <TextField
              id='password2'
              label='Повторите пароль'
              InputLabelProps={{
                shrink: true,
              }}
              variant='filled'
              type='password'
              error={Boolean(errors.password_2?.message)}
              helperText={errors.password_2?.message}
              {...register('password_2', { required: 'Повторите пароль' })}
              fullWidth
            />
            <Button className='auth-modal__submit' type='submit' variant='contained' fullWidth>
              Сменить
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

export default ResetModal