import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setTotalCount } from '../../store/slices/context/pagination'
import { fetchDevices } from '../../store/slices/devices'
import ProductsItem from '../products-item/ProductsItem'
import './ProductsList.scss'

interface ProductsListProps {
  brandId: number | null
  typeId: number | null
  sortPrice: string
}

const ProductsList: FC<ProductsListProps> = ({ brandId, typeId, sortPrice }) => {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.devices.items)
  const { limit, page } = useAppSelector((state) => state.pagination)

  useEffect(() => {
    dispatch(fetchDevices({ typeId, brandId, sortPrice, limit, page }))
  }, [dispatch, typeId, brandId, sortPrice, limit, page])

  useEffect(() => {
    if (items) {
      dispatch(setTotalCount(items.count))
    }
  }, [dispatch, items])

  if (!items) {
    return null
  }

  return (
    <ul className='products-list'>
      {
        items.rows.map((item) => (
          <ProductsItem key={item.id} {...item} />
        ))
      }
    </ul>
  )
}

export default ProductsList