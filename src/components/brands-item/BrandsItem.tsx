import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { setBrandId } from '../../store/slices/context/sort'
import './BrandsItem.scss'

interface BrandsProps {
  id: number,
  name: string,
  logo: string
}

const BrandsItem: FC<BrandsProps> = ({ id, name, logo }) => {
  const dispatch = useAppDispatch()

  const handleClickBrandId = () => {
    dispatch(setBrandId(id))
  }

  return (
    <div onClick={handleClickBrandId} className='brands-item'>
      <Link to='/products' className='brands-item__link'>
        <img src={`http://localhost:5000${logo}`} alt={name} className='brands-item__logo' />
      </Link>
    </div>
  )
}

export default BrandsItem