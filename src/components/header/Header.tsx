import React, { FC, useState, useRef, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/auth';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import LoginModal from '../login-modal/LoginModal';
import RegisterModal from '../register-modal/RegisterModal';
import AlertError from '../../ui/alert-error/AlertError';
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge';
import { Button, IconButton, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CartIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountIcon from '@mui/icons-material/AccountCircleOutlined';
import './Header.scss'

const Header: FC = () => {
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { data, status, message } = useAppSelector((state) => state.auth)
  const basketItems = useAppSelector((state) => state.basket.items)
  const favoriteItems = useAppSelector((state) => state.favorite.items)
  const [visibleModal, setVisibleModal] = useState<'login' | 'register'>()
  const [openProfile, setOpenProfile] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const profileRef = useRef(null)
  const totalPrice = calcTotalPrice(basketItems)

  const handleOpenProfile = () => {
    setOpenProfile(true)
  }

  const handleOpenLoginModal = () => {
    setVisibleModal('login')
  }

  const handleOpenRegisterModal = () => {
    setVisibleModal('register')
  }

  const handleCloseModal = () => {
    setVisibleModal(undefined)
  }

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  const handleClickLink = () => {
    setOpenProfile(false)
  }

  const handleClickLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  useEffect(() => {
    if (status === 'ERROR') {
      setOpenAlert(true)
    } else {
      setOpenAlert(false)
    }
  }, [status])

  useEffect(() => {
    const handleCloseProfile = (e: any) => {
      if (e.target.closest('.header-profile') !== profileRef.current) {
        setOpenProfile(false)
      }
    }

    document.body.addEventListener('click', handleCloseProfile)

    return () => {
      document.body.removeEventListener('click', handleCloseProfile)
    }
  }, [])

  return (
    <header className={`header ${pathname !== '/' ? 'shadow' : ''}`}>
      <div className="container header__container">
        <NavLink to='/' title='Вернуться на главную' className="header__logo">
          DNS
        </NavLink>
        <div className="header__search">
          <TextField
            className='header__search-input'
            label="Поиск по сайту"
            type="search"
            fullWidth
            InputProps={{
              endAdornment: <IconButton>
                <SearchIcon />
              </IconButton>
            }}
          />
        </div>
        <div className="header__menu">
          <Link to='/favorite' className='header__menu-item'>
            <Badge badgeContent={favoriteItems.length} color="primary">
              <FavoriteIcon className='header__menu-icon' />
            </Badge>
            <div className="header__menu-text">
              Избранное
            </div>
          </Link>
          <Link to='/cart' className='header__menu-item'>
            <Badge badgeContent={basketItems.length} color="primary">
              <CartIcon className='header__menu-icon' />
            </Badge>
            {
              basketItems.length ? (
                <div className="header__menu-text">
                  {totalPrice} ₽
                </div>
              ) : (
                <div className="header__menu-text">
                  Корзина
                </div>
              )
            }
          </Link>
          <div ref={profileRef} className='header__menu-profile header-profile'>
            {
              data ? (
                <div onClick={handleOpenProfile} className='header-profile__avatar'>
                  <img src="https://c.dns-shop.ru/thumb/st1/fit/328/328/6a7bc2b700fa30fed310fe6616e9ff35/bb6fa769bbe393c849a725fde858008447abd5d70bc1309ef92fa65760f39295.png" alt="" />
                </div>
              ) : (
                <IconButton
                  onClick={handleOpenProfile}
                  className='header__menu-item header__menu-button'
                >
                  <AccountIcon className='header__menu-icon' />
                  <div className="header__menu-text">
                    Войти
                  </div>
                </IconButton>
              )
            }
            <div className={`header-profile__wrapper ${openProfile && 'active'}`}>
              {
                data ? (
                  <div className='header-profile__user'>
                    <Link to='/profile' className='header-profile__user-id'>
                      Пришелец - {data.user.id}
                    </Link>
                    <div className='header-profile__user-menu'>
                      <Link to='/' onClick={handleClickLink} className="header-profile__user-link">
                        Заказы
                      </Link>
                      <Link to='/favorite' onClick={handleClickLink} className="header-profile__user-link">
                        Избранное
                      </Link>
                      <Link to='/cart' onClick={handleClickLink} className="header-profile__user-link">
                        Корзина
                      </Link>
                      <Link to='/' onClick={handleClickLink} className="header-profile__user-link">
                        Контрагенты
                      </Link>
                      {
                        data.user.role === 'ADMIN' && (
                          <Link to='/admin' onClick={handleClickLink} className="header-profile__user-link">
                            Админ панель
                          </Link>
                        )
                      }
                      <Link to='/profile' onClick={handleClickLink} className="header-profile__user-link">
                        Настройки профиля
                      </Link>
                      <Button onClick={handleClickLogout} variant='text' className='header-profile__user-logout'>
                        Выйти
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Typography variant='body2' className='header-profile__text'>
                      Получайте бонусы, сохраняйте и отслеживайте заказы.
                    </Typography>
                    <div className="header-profile__btns">
                      <Button onClick={handleOpenRegisterModal} variant='contained' className='header-profile__btn'>
                        Регистрация
                      </Button>
                      <Button onClick={handleOpenLoginModal} variant='contained' className='header-profile__btn'>
                        Войти
                      </Button>
                    </div>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
      <LoginModal open={visibleModal === 'login'} onClose={handleCloseModal} />
      <RegisterModal open={visibleModal === 'register'} onClose={handleCloseModal} />
      {
        openAlert && <AlertError message={message} onClose={handleCloseAlert} />
      }
    </header >
  )
}

export default Header