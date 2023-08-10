import React, { FC, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setPage } from '../../store/slices/context/pagination';
import ProductsList from '../../components/products-list/ProductsList';
import FilterAccord from '../../ui/filter-accord/FilterAccord'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDownIcon from '@mui/icons-material/ArrowDropDown';
import './Products.scss'

const Products: FC = () => {
  const dispatch = useAppDispatch()
  const brands = useAppSelector((state) => state.brands.brands)
  const { brandId, typeId } = useAppSelector((state) => state.sort)
  const products = useAppSelector((state) => state.devices.items)
  const { totalCount, limit, page } = useAppSelector((state) => state.pagination)

  const [visibleSort, setVisibleSort] = useState<boolean>(false)
  const [valueBrand, setValueBrand] = useState<number | null>(brandId ? brandId : null)
  const [sortPrice, setSortPrice] = useState<string>('ASC')

  const sortRef = useRef(null)
  const pageCount = Math.ceil(totalCount / limit)

  const onChangePage = (e: any, value: number) => {
    dispatch(setPage(value))
  }

  const handleClickOpenSort = () => {
    setVisibleSort(!visibleSort)
  }

  const handleChangeValue = (e: any) => {
    setValueBrand(e.target.value);
  }

  const handleChangeSortPrice = (e: any) => {
    setSortPrice(e.target.value)
    setVisibleSort(false)
  }

  useEffect(() => {
    const handleCloseSort = (e: any) => {
      if (e.target.closest('.items__sort-list') !== sortRef.current && !e.target.closest('.items__sort-value')) {
        setVisibleSort(false)
      }
    }

    document.body.addEventListener('click', handleCloseSort)

    return () => {
      document.body.removeEventListener('click', handleCloseSort)
    }
  }, [visibleSort])

  return (
    <div className='products'>
      <div className="container products__container">
        <h1 className="products__title">
          Найдено: {products?.rows.length} товара
        </h1>
        <div className="products__wrapper">
          <div className="products__sidebar filter">
            <div className="filter__body">
              <FilterAccord title='Производитель'>
                <div className="filter__search">
                  <TextField
                    className='filter__search-input'
                    id="outlined-basic"
                    label="Поиск"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      endAdornment: <IconButton>
                        <SearchIcon />
                      </IconButton>
                    }}
                    variant="outlined"
                  />
                </div>
                <FormGroup>
                  {
                    brands.map((item) => (
                      <FormControlLabel
                        key={item.id}
                        control={<Checkbox defaultChecked={item.id === brandId} />}
                        label={item.name}
                        value={item.id}
                        onChange={handleChangeValue}
                      />
                    ))
                  }
                </FormGroup>
              </FilterAccord>
              <FilterAccord title='Цена'>
                <div className="filter__price">
                  <TextField
                    className='filter__price-input'
                    id="outlined-number"
                    label="от"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    className='filter__price-input'
                    id="outlined-number"
                    label="до"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
              </FilterAccord>
              <FilterAccord title='Игровая клавиатура'>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Да"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Нет"
                  />
                </FormGroup>
              </FilterAccord>
              <FilterAccord title='Тип клавиатуры'>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="мембранная"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="механическая"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="оптомеханическая"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="мембранная(частично механика)"
                  />
                </FormGroup>
              </FilterAccord>
              <FilterAccord title='Подсветка клавиш'>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="есть"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="нету"
                  />
                </FormGroup>
              </FilterAccord>
              <div className="filter__btns">
                <Button variant='contained' className='filter__btn filter__btn--select'>
                  Применить
                </Button>
                <Button variant='contained' className='filter__btn filter__btn--reset'>
                  Сбросить
                </Button>
              </div>
            </div>
          </div>
          <div className="products__content items">
            <div className="items__sort">
              <span className="items__sort-text">
                Сортировка:
              </span>
              <div onClick={handleClickOpenSort} className="items__sort-value">
                <div className="items__sort-value-text">
                  {
                    sortPrice === 'ASC' ? 'сначала недорогие' : 'сначала дорогие'
                  }
                </div>
                <ArrowDownIcon className='items__sort-arrow' />
              </div>
              {
                visibleSort && (
                  <div ref={sortRef} className="items__sort-list">
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="Сначала недорогие"
                      name="radio-buttons-group"
                      value={sortPrice}
                      onChange={handleChangeSortPrice}
                    >
                      <FormControlLabel
                        className='items__sort-list-control'
                        control={<Radio className='items__sort-list-radio' />}
                        label="Сначала дорогие"
                        value='DESC'
                      />
                      <FormControlLabel
                        className='items__sort-list-control'
                        control={<Radio className='items__sort-list-radio' />}
                        label="Сначала недорогие"
                        value='ASC'
                      />
                    </RadioGroup>
                  </div>
                )
              }
            </div>
            <div className="items__title">
              Товары
            </div>
            <ProductsList brandId={valueBrand} typeId={typeId} sortPrice={sortPrice} />
            <Button variant='contained' className='products__more'>
              Показать еще
            </Button>
            <div className="products__pagination">
              <Stack spacing={2}>
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={onChangePage}
                  variant="outlined"
                  shape="rounded"
                  size='large'
                />
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products