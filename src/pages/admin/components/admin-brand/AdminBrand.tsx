import React, { FC, useState } from 'react'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { fetchCreateBrand, fetchEditBrand } from '../../../../store/slices/brands'
import BrandItem from '../BrandItem'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

const AdminBrand: FC = () => {
  const dispatch = useAppDispatch()
  const brands = useAppSelector((state) => state.brands.brands)
  const [name, setName] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [itemId, setItemId] = useState<number | null>(null)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  
  const handleChangeName = (e: any) => {
    setName(e.target.value)
  }

  const handleChangeFile = async (e: any) => {
    try {
      const formData = new FormData()
      const file = e.target.files[0]
      formData.append('image', file)
      const { data } = await axios.post('http://localhost:5000/upload', formData)
      setImage(data.url)
    } catch (e: any) {
      console.log(e);
    }
  }

  const createBrand = () => {
    dispatch(fetchCreateBrand({ name, logo: image }))
    setName('')
    setImage('')
  }

  const onClickCanselEdit = () => {
    setIsEdit(false)
    setName('')
    setImage('')
  }

  const editBrand = () => {
    if (itemId) {
      dispatch(fetchEditBrand({ id: itemId, name, logo: image }))
    }
    setIsEdit(false)
    setName('')
    setImage('')
  }

  return (
    <div className='admin__wrapper'>
      <div className="admin__heading admin__wrapper-item">
        <div className="admin__title">
          Создать бренд
        </div>
        <form className="admin__form">
          <div className="admin__form-fields">
            <TextField
              className='admin__form-input'
              label='Название бренда'
              type='text'
              variant='filled'
              value={name}
              onChange={handleChangeName}
              autoFocus
              fullWidth
            />
            <TextField
              className='admin__form-input'
              type='file'
              onChange={handleChangeFile}
            />
            {
              image && (
                <div className="admin__form-preview">
                  <img src={`http://localhost:5000${image}`} alt="" className="admin__form-preview-img" />
                </div>
              )
            }
          </div>
          {
            isEdit ? (
              <div>
                <Button onClick={editBrand} disabled={!name.length} variant='contained' className='admin__form-submit'>
                  Изменить
                </Button>
                <Button onClick={onClickCanselEdit} style={{ marginLeft: '10px' }} variant='outlined'>
                  Отменить
                </Button>
              </div>
            ) : (
              <Button onClick={createBrand} variant='contained' className='admin__form-submit'>
                Создать
              </Button>
            )
          }
        </form>
      </div>
      <div className="admin__content admin__wrapper-item">
        <ul className="admin__table">
          {
            brands.map((brand) => (
              <BrandItem
                key={brand.id}
                {...brand}
                setName={setName}
                setImage={setImage}
                setItemId={setItemId}
                setIsEdit={setIsEdit}
              />
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default AdminBrand