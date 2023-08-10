import React, { FC, useEffect } from 'react'
import { useAppDispatch } from '../../store/hooks'
import { useLocation } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import TypesList from '../../components/types-list/TypesList'
import Brands from '../../components/brands/Brands'
import RecentsList from '../../components/recents-list/RecentsList'
import './Home.scss'
import { setBrandId, setTypeId } from '../../store/slices/context/sort'

const Home: FC = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') {
      dispatch(setBrandId(null))
      dispatch(setTypeId(null))
    }
  }, [dispatch, location])

  return (
    <div className='home'>
      <div className="home__container container">
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <TypesList />
          </Grid>
          <Grid item xs={10}>
            <div className='home__content'>
              <Brands />
              <div className="home__recents">
                <h2 className="home__recents-title">
                  Вы недавно смотрели
                </h2>
                <RecentsList />
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Home