import React, { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProduct } from '../../store/slices/product';
import ProductInfo from '../../components/product-info/ProductInfo';
import { Button, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined';
import './Product.scss'
import { fetchAddProduct } from '../../store/slices/basket';
import { fetchAddFavoriteProduct, fetchRemoveFavorite } from '../../store/slices/favorite';

const Product: FC = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const favoriteItems = useAppSelector((state) => state.favorite.items)
  const product = useAppSelector((state) => state.product.product)
  const addedFavoriteItem = favoriteItems.find((obj) => obj.deviceId === product?.id)

  useEffect(() => {
    dispatch(fetchProduct(id))
  }, [dispatch, id])

  if (!product) {
    return null
  }

  const addProductInCart = () => {
    dispatch(fetchAddProduct({ title: product.title, price: product.price, image: product.image, id: product.id }))
  }

  const addProductInFavorite = () => {
    if (addedFavoriteItem) {
      dispatch(fetchRemoveFavorite(addedFavoriteItem.id))
    } else {
      dispatch(fetchAddFavoriteProduct({ title: product.title, price: product.price, image: product.image, id: product.id }))
    }
  }

  return (
    <div className='product'>
      <div className="product__container container">
        <div className="product__header">
          <h1 className="product__title">
            {product.title}
          </h1>
          <div className="product__wrapper product__header-content">
            <div className="product__left">
              <img src={`http://localhost:5000${product?.image}`} alt="" className="product__img" />
            </div>
            <div className="product__right">
              <div className="product__right-title">
                {product.title}
              </div>
              <div className="product__right-item">
                <div className="product__price">
                  {product.price} ₽
                </div>
                <div className="product__btns">
                  <IconButton
                    onClick={addProductInFavorite}
                    className={`product__btns-favorite ${addedFavoriteItem ? 'favorite-active' : ''}`}
                  >
                    <FavoriteIcon className='product__btns-favorite-icon' />
                  </IconButton>
                  <Button onClick={addProductInCart} variant='contained' className='product__btns-buy'>
                    Купить
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="product__wrapper product__footer">
          <div className="product__footer-title">
            {product.title}
          </div>
          <ul className="product__info">
            {
              product.info.map((item) => (
                <ProductInfo key={item.id} {...item} />
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Product