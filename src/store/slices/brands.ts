import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { StatusState } from '../types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { $authHost, $host } from '../../services/axios'

interface CreateBrandParams {
  name: string
  logo: string
}

export const fetchBrands = createAsyncThunk('brands/fetchBrands', async () => {
  const { data } = await $host.get('/brand')
  return data
})

export const fetchCreateBrand = createAsyncThunk('brands/fetchCreateBrand', async ({ name, logo }: CreateBrandParams) => {
  const { data } = await $authHost.post('/brand', { name, logo })
  return data
})

interface EditBrandParams {
  id: number
  name: string
  logo: string
}

export const fetchEditBrand = createAsyncThunk('brands/fetchEditBrand', async ({ id, name, logo }: EditBrandParams) => {
  const { data } = await $authHost.put(`/brand/${id}`, { name, logo })
  return data
})

export const fetchRemoveBrand = createAsyncThunk('brands/fetchRemoveBrand', async (id: number) => {
  const { data } = await $authHost.delete(`/brand/${id}`)
  return data
})

export interface BrandsState {
  id: number,
  name: string,
  logo: string,
  createdAt: string,
  updatedAt: string
}

interface BrandsInitialState {
  brands: BrandsState[],
  status: StatusState,
  message: string | undefined
}

const initialState: BrandsInitialState = {
  brands: [],
  status: StatusState.NEVER,
  message: undefined
}

export const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchBrands.pending, (state) => {
      state.brands = []
      state.status = StatusState.LOADING
      state.message = undefined
    })
    builder.addCase(fetchBrands.fulfilled, (state, action: PayloadAction<BrandsState[]>) => {
      state.brands = action.payload
      state.status = StatusState.SUCCESS
    })
    builder.addCase(fetchBrands.rejected, (state, action) => {
      state.brands = []
      state.status = StatusState.ERROR
      state.message = action.error.message
    })

    builder.addCase(fetchCreateBrand.pending, (state) => {
      state.status = StatusState.LOADING
      state.message = undefined
    })
    builder.addCase(fetchCreateBrand.fulfilled, (state, action: PayloadAction<BrandsState>) => {
      state.brands.push(action.payload)
      state.status = StatusState.SUCCESS
    })
    builder.addCase(fetchCreateBrand.rejected, (state, action) => {
      state.status = StatusState.ERROR
      state.message = action.error.message
    })

    builder.addCase(fetchEditBrand.pending, (state) => {
      state.status = StatusState.LOADING
      state.message = undefined
    })
    builder.addCase(fetchEditBrand.fulfilled, (state, action: PayloadAction<BrandsState>) => {
      const index = state.brands.findIndex((item) => item.id === action.payload.id)
      state.brands.splice(index, 1, action.payload)
      state.status = StatusState.SUCCESS
    })
    builder.addCase(fetchEditBrand.rejected, (state, action) => {
      state.status = StatusState.ERROR
      state.message = action.error.message
    })

    builder.addCase(fetchRemoveBrand.pending, (state) => {
      state.status = StatusState.LOADING
      state.message = undefined
    })
    builder.addCase(fetchRemoveBrand.fulfilled, (state, action: PayloadAction<BrandsState>) => {
      state.brands = state.brands.filter((item) => item.id !== action.payload.id)
      state.status = StatusState.SUCCESS
    })
    builder.addCase(fetchRemoveBrand.rejected, (state, action) => {
      state.status = StatusState.ERROR
      state.message = action.error.message
    })
  },
})

export const { } = brandsSlice.actions

export default brandsSlice.reducer