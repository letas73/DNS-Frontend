import React, { FC, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreIcon from '@mui/icons-material/MoreVertOutlined';
import { useAppDispatch } from '../../../store/hooks';
import { fetchRemoveBrand } from '../../../store/slices/brands';

interface BrandItemProps {
  id: number
  name: string
  logo: string
  setItemId: React.Dispatch<React.SetStateAction<number | null>>
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  setName: React.Dispatch<React.SetStateAction<string>>
  setImage: React.Dispatch<React.SetStateAction<string>>
}

const BrandItem: FC<BrandItemProps> = ({ id, name, logo, setItemId, setIsEdit, setName, setImage }) => {
  const dispatch = useAppDispatch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const removeBrand = () => {
    dispatch(fetchRemoveBrand(id))
    setAnchorEl(null)
  }

  const onClickEdit = () => {
    setItemId(id)
    setIsEdit(true)
    setName(name)
    setImage(logo)
    setAnchorEl(null)

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <li className="admin__table-item">
      <div className="admin__table-item-block admin__table-item-id">
        <div style={{ marginBottom: '5px', fontWeight: 500 }}>ID:</div>
        {id}
      </div>
      <div className="admin__table-right">
        <div className="admin__table-item-title">
          <div style={{ marginBottom: '5px', fontWeight: 500 }}>Название бренда:</div>
          {name}
        </div>
        <div className="admin__table-more">
          <IconButton
            className='admin__table-btn'
            id="basic-button"
            aria-controls={open ? 'brand-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MoreIcon />
          </IconButton>
          <Menu
            id="brand-menu"
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={onClickEdit}>Изменить</MenuItem>
            <MenuItem onClick={removeBrand}>Удалить</MenuItem>
          </Menu>
        </div>
      </div>
    </li>
  )
}

export default BrandItem