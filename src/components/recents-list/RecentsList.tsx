import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchRecentsDevices } from '../../store/slices/recents'
import ProductLoader from '../../ui/ProductLoader'
import RecentsItems from '../recents-items/RecentsItems'
import './RecentsList.scss'

const RecentsList: FC = () => {
  const dispatch = useAppDispatch()
  const { items, status } = useAppSelector((state) => state.recents)
  const user = useAppSelector((state) => state.auth.data)
  const isLoading = status === 'LOADING'

  useEffect(() => {
    if (user) {
      dispatch(fetchRecentsDevices())
    }
  }, [dispatch, user])

  return (
    <ul className='recents-list'>
      {
        isLoading ? [...new Array(5)].map((_, index) => <ProductLoader key={index} />)
          : items.map((item) => <RecentsItems key={item.id} {...item} />)
      }
    </ul>
  )
}

export default RecentsList