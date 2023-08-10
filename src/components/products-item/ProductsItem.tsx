import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAddRecentDevice } from '../../store/slices/recents';
import { fetchAddProduct } from '../../store/slices/basket';
import { Button, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined';
import './ProductsItem.scss'
import { fetchAddFavoriteProduct, fetchRemoveFavorite } from '../../store/slices/favorite';

interface ProductsItemProps {
  id: number
  title: string
  image: string
  price: number
  typeId: number
  brandId: number
}

const ProductsItem: FC<ProductsItemProps> = ({ id, title, price, image, typeId, brandId }) => {
  const dispatch = useAppDispatch()
  const favoriteItems = useAppSelector((state) => state.favorite.items)
  const addedFavoriteItem = favoriteItems.find((obj) => obj.deviceId === id)

  const addRecentItem = () => {
    const item = {
      title,
      price,
      image,
      deviceId: id
    }
    dispatch(fetchAddRecentDevice(item))
  }

  const addProductInCart = () => {
    dispatch(fetchAddProduct({ title, price, image, id }))
  }

  const addProductInFavorite = () => {
    if (addedFavoriteItem) {
      dispatch(fetchRemoveFavorite(addedFavoriteItem.id))
    } else {
      dispatch(fetchAddFavoriteProduct({ title, price, image, id }))
    }
  }

  return (
    <li className='products-item'>
      <div className="products-item__left">
        <div className="products-item__preview">
          <Link onClick={addRecentItem} to={`/products/${id}`} className='products-item__preview-link'>
            <img src={`http://localhost:5000${image}`} alt="" className="products-item__preview-img" />
          </Link>
        </div>
        <Link onClick={addRecentItem} to={`/products/${id}`} className="products-item__title">
          {title}
        </Link>
      </div>
      <div className="products-item__right">
        <div className="products-item__price">
          {price} ₽
        </div>
        <div className="products-item__btns">
          <IconButton
            onClick={addProductInFavorite}
            className={`products-item__favorite ${addedFavoriteItem ? 'favorite-active' : ''}`}
          >
            <FavoriteIcon className='products-item__favorite-icon' />
          </IconButton>
          <Button onClick={addProductInCart} className='products-item__buy'>
            Купить
          </Button>
        </div>
      </div>
    </li>
  )
}

export default ProductsItem