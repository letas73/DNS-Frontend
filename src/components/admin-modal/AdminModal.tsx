import React, { FC } from 'react'
import { InfoState } from '../../pages/admin/components/admin-product/AdminProduct'
import Modal from '../../ui/modal/Modal'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import './AdminModal.scss'

interface AdminModalProps {
  open: boolean
  onClose: () => void
  info: InfoState[]
  addInfo: () => void
  changeInfo: (key: string, value: string, number: number) => void
  removeInfo: (number: number) => void
}

const AdminModal: FC<AdminModalProps> = ({ open, onClose, info, addInfo, changeInfo, removeInfo }) => {
  return (
    <Modal visible={open} onClose={onClose} title='Добавить характеристики'>
      {
        info.map((item) => (
          <div key={item.number} className='admin-modal'>
            <TextField
              className='admin-modal__input'
              label='Название'
              type='text'
              variant='outlined'
              value={item.title}
              onChange={(e) => changeInfo('title', e.target.value, item.number)}
              autoFocus
            />
            <TextField
              className='admin-modal__input'
              label='Описание'
              type='text'
              value={item.text}
              onChange={(e) => changeInfo('text', e.target.value, item.number)}
              variant='outlined'
            />
            <Button
              onClick={() => removeInfo(item.number)}
              variant='outlined'
              className='admin-modal__btn admin-modal__remove'
              disabled={info.length === 1}
            >
              Удалить
            </Button>
          </div>
        ))
      }
      <Button onClick={addInfo} variant='contained' className='admin-modal__add admin-modal__btn'>
        Добавить характеристику
      </Button>
    </Modal>
  )
}

export default AdminModal