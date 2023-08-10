import React, { FC } from 'react'
import { useAppSelector } from '../../store/hooks'
import TypeLoader from '../../ui/TypeLoader'
import TypesItem from '../types-item/TypesItem'
import './TypesList.scss'

const TypesList: FC = () => {
  const { types, status } = useAppSelector((state) => state.types)
  const isLoading = status === 'LOADING'

  return (
    <ul className='types-list'>
      {
        isLoading ? [...new Array(8)].map((_, index) => <TypeLoader key={index} />)
          : types.map((type) => <TypesItem key={type.id} {...type} />)
      }
    </ul>
  )
}

export default TypesList