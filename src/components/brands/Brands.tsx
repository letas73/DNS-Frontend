import React, { FC } from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import BrandsItem from '../brands-item/BrandsItem'

import 'swiper/css'
import 'swiper/css/navigation'
import './Brands.scss'
import BrandLoader from '../../ui/BrandLoader'

const Brands: FC = () => {
  const { brands, status } = useAppSelector((state) => state.brands)
  const isLoading = status === 'LOADING'

  return (
    <div className="brands">
      <Swiper
        // @ts-ignore
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={6}
        navigation
        onSlideChange={() => console.log('slide change')}
      >
        {
          isLoading ? [...new Array(5)].map((_, index) => <BrandLoader key={index} />)
            : brands.map((brand) => {
              return (
                <SwiperSlide key={brand.id}>
                  <BrandsItem {...brand} />
                </SwiperSlide>
              )
            })
        }
      </Swiper>
    </div>
  )
}

export default Brands