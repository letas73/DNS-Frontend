import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { StatusState } from '../types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { $host } from '../../services/axios'

export const fetchProduct = createAsyncThunk('product/fetchProduct', async (id: string | undefined) => {
  try {
    const { data } = await $host.get(`/device/${id}`)
    return data
  } catch (e: any) {
    throw new Error(e.response.data.message)
  }
})

interface ProductInfo {
  id: number
  title: string
  text: string
  deviceId: number
}

interface ProductData {
  id: number
  title: string
  price: number
  brandId: number
  typeId: number
  image: string
  info: ProductInfo[]
}

interface ProductInitialState {
  product: ProductData | null,
  status: StatusState,
  message: string | undefined
}

const initialState: ProductInitialState = {
  product: null,
  status: StatusState.NEVER,
  message: undefined
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.product = null
      state.status = StatusState.LOADING
      state.message = undefined
    })
    builder.addCase(fetchProduct.fulfilled, (state, action: PayloadAction<ProductData>) => {
      state.product = action.payload
      state.status = StatusState.SUCCESS
    })
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.product = null
      state.status = StatusState.ERROR
      state.message = action.error.message
    })
  },
})

export const { } = productSlice.actions

export default productSlice.reducer