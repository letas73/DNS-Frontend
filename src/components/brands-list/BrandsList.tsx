import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchBrands } from '../../store/slices/brands'
import BrandsItem from '../brands-item/BrandsItem'
import './BrandsList.scss'

const BrandsList: FC = () => {
  const dispatch = useAppDispatch()
  const brands = useAppSelector((state) => state.brands.brands)

  useEffect(() => {
    dispatch(fetchBrands())
  }, [dispatch])

  return (
    <ul className='brands-list'>
      {
        brands.map((brand) => (
          <BrandsItem key={brand.id} {...brand} />
        ))
      }
    </ul>
  )
}

export default BrandsList