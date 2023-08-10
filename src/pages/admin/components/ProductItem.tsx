import React, { FC, useState } from 'react'
import { useAppDispatch } from '../../../store/hooks';
import { DeviceInfo, fetchRemoveDevice } from '../../../store/slices/devices';
import { InfoState } from './admin-product/AdminProduct';
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreIcon from '@mui/icons-material/MoreVertOutlined';

interface ProductItemProps {
  id: number
  price: number
  typeId: number
  brandId: number
  title: string
  image: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  setPrice: React.Dispatch<React.SetStateAction<number>>
  setImage: React.Dispatch<React.SetStateAction<string>>
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  setItemId: React.Dispatch<React.SetStateAction<number | null>>
}

const ProductItem: FC<ProductItemProps> = ({ id, price, typeId, image, brandId, title, setTitle, setPrice, setImage, setIsEdit, setItemId }) => {
  const dispatch = useAppDispatch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const removeProduct = () => {
    dispatch(fetchRemoveDevice(id))
    setAnchorEl(null)
  }

  const onClickEdit = () => {
    setItemId(id)
    setIsEdit(true)
    setTitle(title)
    setImage(image)
    setPrice(price)
    setAnchorEl(null)

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <li className="admin__table-item">
      <div className="admin__table-item-block admin__table-item-id">
        <div style={{ marginBottom: '5px', fontWeight: 500 }}>ID:</div>
        {id}
      </div>
      <div className="admin__table-item-block">
        <div style={{ marginBottom: '5px', fontWeight: 500 }}>Цена:</div>
        {price} ₽
      </div>
      <div className="admin__table-item-block">
        <div style={{ marginBottom: '5px', fontWeight: 500 }}>ID типа:</div>
        {typeId}
      </div>
      <div className="admin__table-item-block">
        <div style={{ marginBottom: '5px', fontWeight: 500 }}>ID бренда:</div>
        {brandId}
      </div>
      <div className="admin__table-right">
        <div className="admin__table-item-title">
          <div style={{ marginBottom: '5px', fontWeight: 500 }}>Название товара:</div>
          {title}
        </div>
        <div className="admin__table-more">
          <IconButton
            className='admin__table-btn'
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MoreIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={onClickEdit}>Изменить</MenuItem>
            <MenuItem onClick={removeProduct}>Удалить</MenuItem>
          </Menu>
        </div>
      </div>
    </li>
  )
}

export default ProductItem