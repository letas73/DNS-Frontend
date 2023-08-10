import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { format } from 'date-fns';
import { fetchRemove } from '../../store/slices/auth';
import ResetModal from '../../components/reset-modal/ResetModal';
import AlertError from '../../ui/alert-error/AlertError';
import { TextField } from '@mui/material'
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import EventsIcon from '@mui/icons-material/EmojiEventsOutlined';
import GradeIcon from '@mui/icons-material/GradeOutlined';
import ArrowIcon from '@mui/icons-material/ArrowRightAltOutlined';
import './Profile.scss'

const Profile: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { data, status, message } = useAppSelector((state) => state.auth)
  const [visibleModal, setVisibleModal] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)

  const handleOpenModal = () => {
    setVisibleModal(true)
  }

  const handleCloseModal = () => {
    setVisibleModal(false)
  }

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  const removeAccount = () => {
    dispatch(fetchRemove(data?.user?.id))
    navigate('/')
  }

  useEffect(() => {
    if (status === 'ERROR') {
      setOpenAlert(true)
    } else {
      setOpenAlert(false)
    }
  }, [status])

  return (
    <div className='profile'>
      <div className="container profile__container">
        <div className="profile__title">
          Настройки
        </div>
        <div className='profile__wrapper'>
          <div className='profile__item profile__nav'>
            <div className="profile__nav-list">
              <div className="profile__nav-item active">
                <SettingsIcon className='profile__nav-icon' />
                <div className="profile__nav-text">
                  Настройки
                </div>
              </div>
              <div className="profile__nav-item">
                <GradeIcon className='profile__nav-icon' />
                <div className="profile__nav-text">
                  Лента активностей
                </div>
              </div>
              <div className="profile__nav-item">
                <EventsIcon className='profile__nav-icon' />
                <div className="profile__nav-text">
                  Достижения
                </div>
              </div>
            </div>
          </div>
          <div className='profile__content'>
            <div className="profile__item profile-heading">
              <div className="profile-heading__avatar">
                <img src="https://c.dns-shop.ru/thumb/st1/fit/328/328/6a7bc2b700fa30fed310fe6616e9ff35/bb6fa769bbe393c849a725fde858008447abd5d70bc1309ef92fa65760f39295.png" alt="" className="profile-heading__avatar-img" />
                <div className="profile-heading__avatar-hover">
                  Сменить аватар
                </div>
              </div>
              <div className="profile-heading__id">
                Пришелец - {data?.user.id}
              </div>
            </div>
            <div className="profile__item profile-info">
              <div onClick={handleOpenModal} className="profile-info__reset">
                Сменить пароль
                <ArrowIcon className='profile-info__reset-icon' />
              </div>
              <div className="profile-info__fields">
                <TextField
                  className='profile-info__fields-input'
                  id='E-mail'
                  label='E-mail'
                  variant='outlined'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={data?.user.email}
                  type='email'
                />
                <TextField
                  className='profile-info__fields-input'
                  id='nickname'
                  label='Никнейм'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant='outlined'
                  type='text'
                  value={`Пришелец-${data?.user.id}`}
                />
              </div>
              <div onClick={removeAccount} className="profile-info__delete">
                Удалить профиль
              </div>
              <div className="profile-info__date">
                Дата регистрации:
                <span className='profile-info__date-text'>
                  {
                    data ? format(new Date(data?.user.createdAt), 'dd-MM-yyyy') : null
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ResetModal open={visibleModal} onClose={handleCloseModal} />
      {
        openAlert && (
          <AlertError message={message} onClose={handleCloseAlert} />
        )
      }
    </div>
  )
}

export default Profile