import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchRemoveRecentDevice } from '../../store/slices/recents';
import { fetchAddFavoriteProduct, fetchRemoveFavorite } from '../../store/slices/favorite';
import { fetchAddProduct } from '../../store/slices/basket';
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/CloseOutlined';
import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CartIcon from '@mui/icons-material/ShoppingCartOutlined';
import './RecentsItems.scss'

interface RecentsItemsProps {
  id: number
  title: string
  price: number
  image: string
  deviceId: number
}

const RecentsItems: FC<RecentsItemsProps> = ({ id, title, price, image, deviceId }) => {
  const dispatch = useAppDispatch()
  const favoriteItems = useAppSelector((state) => state.favorite.items)
  const addedFavoriteItem = favoriteItems.find((obj) => obj.deviceId === deviceId)

  const removeItem = () => {
    dispatch(fetchRemoveRecentDevice(id))
  }

  const addProductInCart = () => {
    dispatch(fetchAddProduct({ title, price, image, id: deviceId }))
  }

  const addProductInFavorite = () => {
    if (addedFavoriteItem) {
      dispatch(fetchRemoveFavorite(addedFavoriteItem.id))
    } else {
      dispatch(fetchAddFavoriteProduct({ title, price, image, id: deviceId }))
    }
  }

  return (
    <li className='recents-items'>
      <div className="recents-items__heading">
        <div className='recents-items__link'>
          <Link to={`/products/${deviceId}`}>
            <img src={`http://localhost:5000${image}`} alt={title} className="recents-items__img" />
          </Link>
          <IconButton onClick={removeItem} className='recents-items__del'>
            <CloseIcon className='recents-items__del-icon' />
          </IconButton>
        </div>
        <Link to={`/products/${deviceId}`} className='recents-items__title'>
          {title}
        </Link>
      </div>
      <div className="recents-items__footer">
        <div className="recents-items__price">
          {price} ₽
        </div>
        <IconButton
          onClick={addProductInFavorite}
          className={`recents-items__btn ${addedFavoriteItem ? 'favorite-active' : ''}`}
        >
          <FavoriteIcon className='recents-items__btn-icon' />
        </IconButton>
        <IconButton onClick={addProductInCart} className='recents-items__btn'>
          <CartIcon className='recents-items__btn-icon' />
        </IconButton>
      </div>
    </li>
  )
}

export default RecentsItems