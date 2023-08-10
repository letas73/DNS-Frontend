import React, { FC, useState } from 'react'
import { Button, TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { fetchCreateType, fetchEditType, fetchRemoveType } from '../../../../store/slices/types';
import TypeItem from '../TypeItem';

const AdminType: FC = () => {
  const dispatch = useAppDispatch()
  const types = useAppSelector((state) => state.types.types)
  const [name, setName] = useState<string>('')
  const [itemId, setItemId] = useState<number | null>(null)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const handleChangeName = (e: any) => {
    setName(e.target.value)
  }

  const createType = () => {
    dispatch(fetchCreateType(name))
    setName('')
  }

  const onClickCanselEdit = () => {
    setIsEdit(false)
    setName('')
  }

  const editType = () => {
    if (itemId) {
      dispatch(fetchEditType({ id: itemId, name }))
    }
    setIsEdit(false)
    setName('')
  }

  return (
    <div className='admin__wrapper'>
      <div className="admin__heading admin__wrapper-item">
        <div className="admin__title">
          Создать тип
        </div>
        <form className="admin__form">
          <div className="admin__form-fields">
            <TextField
              className='admin__form-input'
              label='Название типа'
              type='text'
              variant='filled'
              value={name}
              onChange={handleChangeName}
              autoFocus
              fullWidth
            />
          </div>
          {
            isEdit ? (
              <div>
                <Button onClick={editType} disabled={!name.length} variant='contained' className='admin__form-submit'>
                  Изменить
                </Button>
                <Button onClick={onClickCanselEdit} style={{ marginLeft: '10px' }} variant='outlined'>
                  Отменить
                </Button>
              </div>
            ) : (
              <Button onClick={createType} disabled={!name.length} variant='contained' className='admin__form-submit'>
                Создать
              </Button>
            )
          }
        </form>
      </div>
      <div className="admin__content admin__wrapper-item">
        <ul className="admin__table">
          {
            types.map((type) => (
              <TypeItem
                key={type.id}
                {...type}
                setItemId={setItemId}
                setIsEdit={setIsEdit}
                setName={setName}
              />
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default AdminType