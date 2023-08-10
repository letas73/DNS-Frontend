import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchBasket } from '../../store/slices/basket'
import { calcTotalPrice } from '../../utils/calcTotalPrice'
import CartItem from '../../components/cart-item/CartItem'
import { Box, Button } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import './Cart.scss'

const Cart: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { items, status } = useAppSelector((state) => state.basket)
  const totalPrice = calcTotalPrice(items)

  const handleClickHomeLink = () => {
    navigate('/')
  }

  const handleClickProductLink = () => {
    navigate('/products')
  }

  useEffect(() => {
    dispatch(fetchBasket())
  }, [dispatch])

  if (status === 'LOADING') {
    return (
      <div className='loading'>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className='cart'>
      <div className="cart__container container">
        {
          items.length ? (
            <>
              <div className="cart__top">
                <h1 className="cart__title">
                  Корзина
                </h1>
                <div className="cart__count">
                  {items.length} товар(а/ов)
                </div>
              </div>
              <div className="cart__wrapper">
                <div className="cart__content">
                  <ul className="cart__list">
                    {
                      items.map((item) => (
                        <CartItem key={item.id} {...item} />
                      ))
                    }
                  </ul>
                </div>
                <div className="cart__sidebar">
                  <div className="cart__sidebar-title">
                    Условия заказа
                  </div>
                  <div className="cart__sidebar-info">
                    <div className="cart__sidebar-total">
                      <div className="cart__sidebar-total-caption">
                        Итого:
                      </div>
                      <div className="cart__sidebar-total-count">
                        {items.length} товар(а/ов)
                      </div>
                    </div>
                    <div className="cart__sidebar-price">
                      {totalPrice} ₽
                    </div>
                  </div>
                  <Button fullWidth variant='contained' className='cart__sidebar-btn'>
                    Перейти к оформлению
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="cart__empty">
              <div className="cart__empty-title">
                Корзина пуста
              </div>
              <div className="cart__empty-text">
                Посмотрите предложения на главной странице, воспользуйтесь каталогом или поиском
              </div>
              <div className="cart__empty-btns">
                <Button onClick={handleClickHomeLink} variant='contained' className='cart__empty-home'>
                  На главную
                </Button>
                <Button onClick={handleClickProductLink} variant='contained' className='cart__empty-product'>
                  В каталог
                </Button>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Cart