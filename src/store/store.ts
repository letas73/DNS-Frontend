import { configureStore } from '@reduxjs/toolkit'
import typesSlice from './slices/types'
import brandsSlice from './slices/brands'
import recentsSlice from './slices/recents'
import authSlice from './slices/auth'
import devicesSlice from './slices/devices'
import sortSlice from './slices/context/sort'
import productSlice from './slices/product'
import basketSlice from './slices/basket'
import favoriteSlice from './slices/favorite'
import paginationSlice from './slices/context/pagination'

export const store = configureStore({
  reducer: {
    types: typesSlice,
    brands: brandsSlice,
    recents: recentsSlice,
    auth: authSlice,
    devices: devicesSlice,
    sort: sortSlice,
    pagination: paginationSlice,
    product: productSlice,
    basket: basketSlice,
    favorite: favoriteSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch