import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks';
import { fetchRemoveFavorite } from '../../store/slices/favorite';
import { fetchAddProduct } from '../../store/slices/basket';
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined';
import './FavoriteItem.scss'

interface FavoriteItemProps {
  id: number
  title: string
  image: string
  price: number
  deviceId: number
}

const FavoriteItem: FC<FavoriteItemProps> = ({ id, title, image, price, deviceId }) => {
  const dispatch = useAppDispatch()

  const removeProduct = () => {
    dispatch(fetchRemoveFavorite(id))
  }

  const addProductInCart = () => {
    dispatch(fetchAddProduct({ title, image, price, id: deviceId }))
  }

  return (
    <li className='favorite-item'>
      <div className="favorite-item__left">
        <Link to={`/products/${deviceId}`} className="favorite-item__preview">
          <img src={`http://localhost:5000${image}`} />
        </Link>
        <Link to={`/products/${deviceId}`} className="favorite-item__title">
          {title}
        </Link>
      </div>
      <div className="favorite-item__right">
        <div className="favorite-item__price">
          {price} ₽
        </div>
        <div className="favorite-item__btns">
          <IconButton onClick={removeProduct} className='favorite-item__btn favorite-active'>
            <FavoriteIcon className='favorite-item__btn-icon' />
          </IconButton>
          <Button onClick={addProductInCart} variant='outlined' className='favorite-item__buy'>
            Купить
          </Button>
        </div>
      </div>
    </li>
  )
}

export default FavoriteItem