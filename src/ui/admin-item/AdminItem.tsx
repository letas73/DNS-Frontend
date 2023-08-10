import React, { FC } from 'react'
import './AdminItem.scss'

interface AdminItemProps {
  index: number
  title: string
  onClick: (number: number) => void
  tabIndex: number
}

const AdminItem: FC<AdminItemProps> = ({ index, title, onClick, tabIndex }) => {
  return (
    <li onClick={() => onClick(index)} className={`admin-item ${index === tabIndex ? 'active' : ''}`}>
      {title}
    </li>
  )
}

export default AdminItem