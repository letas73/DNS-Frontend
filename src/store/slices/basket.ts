import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { StatusState } from '../types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { $authHost } from '../../services/axios'

export const fetchBasket = createAsyncThunk('basket/fetchBasket', async () => {
  const { data } = await $authHost.get('/basket')
  return data
})

interface FetchAddProductParams {
  title: string
  price: number
  image: string
  id: number
}

export const fetchAddProduct = createAsyncThunk('basket/fetchAddProduct',
  async ({ title, price, image, id }: FetchAddProductParams) => {
  const { data } = await $authHost.post('/basket', { title, price, image, deviceId: id })
  return data
})

export const fetchRemoveProduct = createAsyncThunk('basket/fetchRemoveProduct', async (id: number) => {
  const { data } = await $authHost.delete(`/basket/${id}`)
  return data
})

export interface BasketState {
  id: number
  title: string
  image: string
  price: number
  count: number
  basketId: number
  deviceId: number
}

interface BasketInitialState {
  items: BasketState[],
  status: StatusState,
  message: string | undefined
}

const initialState: BasketInitialState = {
  items: [],
  status: StatusState.NEVER,
  message: undefined
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchBasket.pending, (state) => {
      state.items = []
      state.status = StatusState.LOADING
      state.message = undefined
    })
    builder.addCase(fetchBasket.fulfilled, (state, action: PayloadAction<BasketState[]>) => {
      state.items = action.payload
      state.status = StatusState.SUCCESS
    })
    builder.addCase(fetchBasket.rejected, (state, action) => {
      state.items = []
      state.status = StatusState.ERROR
      state.message = action.error.message
    })

    builder.addCase(fetchAddProduct.pending, (state) => {
      state.status = StatusState.LOADING
      state.message = undefined
    })
    builder.addCase(fetchAddProduct.fulfilled, (state, action: PayloadAction<BasketState>) => {
      state.items.push(action.payload)
      state.status = StatusState.SUCCESS
    })
    builder.addCase(fetchAddProduct.rejected, (state, action) => {
      state.status = StatusState.ERROR
      state.message = action.error.message
    })

    builder.addCase(fetchRemoveProduct.pending, (state) => {
      state.status = StatusState.LOADING
      state.message = undefined
    })
    builder.addCase(fetchRemoveProduct.fulfilled, (state, action: PayloadAction<BasketState>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id)
      state.status = StatusState.SUCCESS
    })
    builder.addCase(fetchRemoveProduct.rejected, (state, action) => {
      state.status = StatusState.ERROR
      state.message = action.error.message
    })
  },
})

export const { } = basketSlice.actions

export default basketSlice.reducer