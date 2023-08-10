import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { setTypeId } from '../../store/slices/context/sort'
import './TypesItem.scss'

interface TypesItemProps {
  id: number,
  name: string
}

const TypesItem: FC<TypesItemProps> = ({ id, name }) => {
  const dispatch = useAppDispatch()

  const handleClickTypeId = (id: number) => {
    dispatch(setTypeId(id))
  }

  return (
    <li onClick={() => handleClickTypeId(id)} className='types-item'>
      <Link to='/products' className='types-item__link'>
        {name}
      </Link>
    </li>
  )
}

export default TypesItem