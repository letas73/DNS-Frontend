import React, { FC, useState } from 'react'
import AdminItem from '../../ui/admin-item/AdminItem'
import './Admin.scss'
import AdminBrand from './components/admin-brand/AdminBrand'
import AdminProduct from './components/admin-product/AdminProduct'
import AdminType from './components/admin-type/AdminType'

const adminItems = [
  {
    index: 0,
    title: 'Типы'
  },
  {
    index: 1,
    title: 'Бренды'
  },
  {
    index: 2,
    title: 'Товары'
  }
]

const Admin: FC = () => {
  const [tabIndex, setTabIndex] = useState<number>(0)

  const handleClickTab = (index: number) => {
    setTabIndex(index)
  }

  return (
    <div className='admin'>
      <div className="container admin__container">
        <ul className="admin__menu">
          {
            adminItems.map((item) => (
              <AdminItem key={item.index} {...item} onClick={handleClickTab} tabIndex={tabIndex} />
            ))
          }
        </ul>
        {
          tabIndex === 0 && (
            <AdminType />
          )
        }
        {
          tabIndex === 1 && (
            <AdminBrand />
          )
        }
        {
          tabIndex === 2 && (
            <AdminProduct />
          )
        }
      </div>
    </div>
  )
}

export default Admin