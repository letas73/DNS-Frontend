import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchRemoveProduct } from '../../store/slices/basket'
import { fetchAddFavoriteProduct, fetchRemoveFavorite } from '../../store/slices/favorite'
import './CartItem.scss'

interface CartItemProps {
  id: number
  title: string
  price: number
  image: string
  count: number
  deviceId: number
}

const CartItem: FC<CartItemProps> = ({ id, title, price, image, count, deviceId }) => {
  const dispatch = useAppDispatch()
  const favoriteItems = useAppSelector((state) => state.favorite.items)
  const addedFavoriteItem = favoriteItems.find((obj) => obj.deviceId === deviceId)

  const removeProduct = () => {
    dispatch(fetchRemoveProduct(id))
  }

  const addProductInFavorite = () => {
    if (addedFavoriteItem) {
      dispatch(fetchRemoveFavorite(addedFavoriteItem.id))
    } else {
      dispatch(fetchAddFavoriteProduct({ title, price, image, id: deviceId }))
    }
  }

  return (
    <li className='cart-item'>
      <div className="cart-item__left">
        <Link to={`/products/${deviceId}`} className="cart-item__preview">
          <img src={`http://localhost:5000${image}`} alt={title} className="cart-item__preview-img" />
        </Link>
        <div className="cart-item__left-info">
          <Link to={`/products/${deviceId}`} className="cart-item__title">
            {title}
          </Link>
          <div className="cart-item__btns">
            <button onClick={addProductInFavorite} className="cart-item__btns-btn">
              {
                addedFavoriteItem ? `Удалить из избранного` : `Добавить в избранное`
              }
            </button>
            <button onClick={removeProduct} className="cart-item__btns-btn">
              Удалить
            </button>
          </div>
        </div>
      </div>
      <div className="cart-item__price">
        {price} ₽
      </div>
    </li>
  )
}

export default CartItem