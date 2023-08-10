import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchFavorite } from '../../store/slices/favorite'
import FavoriteItem from '../../components/favorite-item/FavoriteItem'
import { Button } from '@mui/material'
import './Favorite.scss'

const Favorite: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const items = useAppSelector((state) => state.favorite.items)
  const totalPrice = items.reduce((sum, obj) => {
    return obj.price + sum
  }, 0)

  const onClickCatalogLink = () => {
    navigate('/products')
  }

  useEffect(() => {
    dispatch(fetchFavorite())
  }, [dispatch])

  return (
    <div className='favorite'>
      <div className="container favorite__container">
        <h1 className="favorite__title">
          Избранное
        </h1>
        <div className="favorite__content">
          {
            items.length ? (
              <>
                <div className="favorite__wrapper favorite__header">
                  <div className="favorite__info">
                    {items.length} товара на сумму: {totalPrice} ₽
                  </div>
                  <Button variant='contained' className='favorite__buy'>
                    Купить
                  </Button>
                </div>
                <div className="favorite__products">
                  <ul className="favorite__products-list">
                    {
                      items.map((item) => (
                        <FavoriteItem key={item.id} {...item} />
                      ))
                    }
                  </ul>
                </div>
              </>
            ) : (
              <div className="favorite__empty">
                <img src="https://as.dns-shop.ru/static/07/1lpnma1/css/4a7b24ba2dd70d4e824a.png" alt="" className="favorite__empty-img" />
                <div className="favorite__empty-text">
                  В списке пока нет ни одного избранного товара
                </div>
                <Button onClick={onClickCatalogLink} variant='contained' className='cart__empty-product'>
                  Перейти в каталог
                </Button>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Favorite