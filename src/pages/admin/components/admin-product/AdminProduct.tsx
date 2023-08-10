import React, { FC, useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import axios from 'axios'
import { fetchCreateDevice, fetchDevices, fetchEditDevice } from '../../../../store/slices/devices'
import AdminModal from '../../../../components/admin-modal/AdminModal'
import ProductItem from '../ProductItem'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import './AdminProduct.scss'

export interface InfoState {
  title: string
  text: string
  number: number
}

const AdminProduct: FC = () => {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.devices.items)
  const types = useAppSelector((state) => state.types.types)
  const brands = useAppSelector((state) => state.brands.brands)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [info, setInfo] = useState<InfoState[]>([
    { title: '', text: '', number: Date.now() }
  ])
  const [title, setTitle] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [typeId, setTypeId] = useState<number>()
  const [brandId, setBrandId] = useState<number>()
  const [image, setImage] = useState<string>('')
  const [itemId, setItemId] = useState<number | null>(null)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleClickAddInfo = () => {
    setInfo([...info, { title: '', text: '', number: Date.now() }])
  }

  const handleChangeInfo = (key: string, value: string, number: number) => {
    setInfo(info.map((i) => i.number === number ? { ...i, [key]: value } : i))
  }

  const handleClickRemoveInfo = (number: number) => {
    setInfo(info.filter((i) => i.number !== number))
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

  const changeTitle = (e: any) => {
    setTitle(e.target.value)
  }

  const changePrice = (e: any) => {
    setPrice(e.target.value)
  }

  const changeTypeId = (e: any) => {
    setTypeId(e.target.value)
  }

  const changeBrandId = (e: any) => {
    setBrandId(e.target.value)
  }

  const createDevice = () => {
    const item = {
      title,
      price,
      image,
      brandId,
      typeId,
      info: JSON.stringify(info)
    }
    dispatch(fetchCreateDevice(item))
    setTitle('')
    setPrice(0)
    setTypeId(undefined)
    setBrandId(undefined)
    setImage('')
    setInfo([{ title: '', text: '', number: Date.now() }])
  }

  const onClickCanselEdit = () => {
    setIsEdit(false)
    setTitle('')
    setPrice(0)
    setTypeId(undefined)
    setBrandId(undefined)
    setImage('')
  }

  const editDevice = () => {
    if (itemId) {
      dispatch(fetchEditDevice({ id: itemId, title, price, image, typeId, brandId }))
    }
    setIsEdit(false)
    setTitle('')
    setPrice(0)
    setTypeId(undefined)
    setBrandId(undefined)
    setImage('')
  }

  useEffect(() => {
    dispatch(fetchDevices({ sortPrice: 'ASC', page: 1, limit: 100 }))
  }, [dispatch])

  if (!items) {
    return null
  }

  return (
    <div className='admin__wrapper admin-product'>
      <div className="admin__heading admin__wrapper-item">
        <div className="admin__title">
          Создать товар
        </div>
        <form className="admin__form">
          <div className="admin__form-fields">
            <TextField
              className='admin__form-input'
              label='Название товара'
              type='text'
              variant='filled'
              value={title}
              onChange={changeTitle}
              autoFocus
              fullWidth
            />
            <TextField
              className='admin__form-input'
              label='цена товара'
              type='number'
              variant='filled'
              value={price}
              onChange={changePrice}
              fullWidth
            />
            <FormControl className='admin__form-select'>
              <InputLabel id="demo-simple-select-label">Типы</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Типы"
                value={typeId}
                onChange={changeTypeId}
                autoWidth
              >
                {
                  types.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <FormControl className='admin__form-select'>
              <InputLabel id="demo-simple-select-label">Бренды</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Бренды"
                value={brandId}
                onChange={changeBrandId}
                autoWidth
              >
                {
                  brands.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
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
          <div className="admin__form-btns">
            {
              isEdit ? (
                <div>
                  <Button onClick={editDevice} disabled={!title.length} variant='contained' className='admin__form-submit'>
                    Изменить
                  </Button>
                  <Button onClick={onClickCanselEdit} style={{ marginLeft: '10px' }} variant='outlined'>
                    Отменить
                  </Button>
                </div>
              ) : (
                <Button onClick={createDevice} variant='contained' className='admin__form-submit'>
                  Создать
                </Button>
              )
            }
            <Button onClick={handleOpenModal} variant='contained' className='admin-product__info'>
              Добавить характеристики
            </Button>
          </div>
        </form>
      </div>
      <div className="admin__content admin__wrapper-item">
        <ul className="admin__table">
          {
            items.rows.map((item) => (
              <ProductItem
                key={item.id}
                {...item}
                setTitle={setTitle}
                setPrice={setPrice}
                setImage={setImage}
                setIsEdit={setIsEdit}
                setItemId={setItemId}
              />
            ))
          }
        </ul>
      </div>
      <AdminModal
        open={openModal}
        onClose={handleCloseModal}
        info={info}
        addInfo={handleClickAddInfo}
        changeInfo={handleChangeInfo}
        removeInfo={handleClickRemoveInfo}
      />
    </div>
  )
}

export default AdminProduct