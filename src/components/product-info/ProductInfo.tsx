import React, { FC } from 'react'
import './ProductInfo.scss'

interface ProductInfoProps {
  title: string
  text: string
}

const ProductInfo: FC<ProductInfoProps> = ({ title, text }) => {
  return (
    <li className='product-info__item'>
      <div className="product-info__item-title">
        {title}
      </div>
      <div className="product-info__item-value">
        {text}
      </div>
    </li>
  )
}

export default ProductInfo