import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { StatusState } from '../types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { $authHost } from '../../services/axios'

export const fetchFavorite = createAsyncThunk('favorite/fetchFavorite', async () => {
  const { data } = await $authHost.get('/favorite')
  return data
})

interface FetchAddProductParams {
  title: string
  price: number
  image: string
  id: number
}

export const fetchAddFavoriteProduct = createAsyncThunk('favorite/fetchAddFavoriteProduct',
  async ({ title, price, image, id }: FetchAddProductParams) => {
  const { data } = await $authHost.post('/favorite', { title, price, image, deviceId: id })
  return data
})

export const fetchRemoveFavorite = createAsyncThunk('favorite/fetchRemoveFavorite', async (id: number) => {
  const { data } = await $authHost.delete(`/favorite/${id}`)
  return data
})

export interface FavoriteState {
  id: number
  title: string
  image: string
  price: number
  favoriteId: number
  deviceId: number
}

interface FavoriteInitialState {
  items: FavoriteState[],
  status: StatusState,
  message: string | undefined
}

const initialState: FavoriteInitialState = {
  items: [],
  status: StatusState.NEVER,
  message: undefined
}

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavorite.pending, (state) => {
      state.items = []
      state.status = StatusState.LOADING
      state.message = undefined
    })
    builder.addCase(fetchFavorite.fulfilled, (state, action: PayloadAction<FavoriteState[]>) => {
      state.items = action.payload
      state.status = StatusState.SUCCESS
    })
    builder.addCase(fetchFavorite.rejected, (state, action) => {
      state.items = []
      state.status = StatusState.ERROR
      state.message = action.error.message
    })

    builder.addCase(fetchAddFavoriteProduct.pending, (state) => {
      state.status = StatusState.LOADING
      state.message = undefined
    })
    builder.addCase(fetchAddFavoriteProduct.fulfilled, (state, action: PayloadAction<FavoriteState>) => {
      state.items.push(action.payload)
      state.status = StatusState.SUCCESS
    })
    builder.addCase(fetchAddFavoriteProduct.rejected, (state, action) => {
      state.status = StatusState.ERROR
      state.message = action.error.message
    })

    builder.addCase(fetchRemoveFavorite.pending, (state) => {
      state.status = StatusState.LOADING
      state.message = undefined
    })
    builder.addCase(fetchRemoveFavorite.fulfilled, (state, action: PayloadAction<FavoriteState>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id)
      state.status = StatusState.SUCCESS
    })
    builder.addCase(fetchRemoveFavorite.rejected, (state, action) => {
      state.status = StatusState.ERROR
      state.message = action.error.message
    })
  },
})

export const { } = favoriteSlice.actions

export default favoriteSlice.reducer