import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { StatusState } from '../types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { $host, $authHost } from '../../services/axios'

export const fetchTypes = createAsyncThunk('types/fetchTypes', async () => {
  const { data } = await $host.get('/type')
  return data
})

export const fetchCreateType = createAsyncThunk('types/fetchCreateType', async (name: string) => {
  const { data } = await $authHost.post('/type', { name })
  return data
})

interface EditTypeParams {
  id: number
  name: string
}

export const fetchEditType = createAsyncThunk('types/fetchEditType', async ({ id, name }: EditTypeParams) => {
  const { data } = await $authHost.put(`/type/${id}`, { name })
  return data
})

export const fetchRemoveType = createAsyncThunk('types/fetchRemoveType', async (id: number) => {
  const { data } = await $authHost.delete(`/type/${id}`)
  return data
})

export interface TypesState {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

interface TypesInitialState {
  types: TypesState[]
  status: StatusState
  message: string | undefined
}

const initialState: TypesInitialState = {
  types: [],
  status: StatusState.NEVER,
  message: undefined
}

export const typesSlice = createSlice({
  name: 'types',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchTypes.pending, (state) => {
      state.types = []
      state.status = StatusState.LOADING
      state.message = undefined
    })
    builder.addCase(fetchTypes.fulfilled, (state, action: PayloadAction<TypesState[]>) => {
      state.types = action.payload
      state.status = StatusState.SUCCESS
    })
    builder.addCase(fetchTypes.rejected, (state, action) => {
      state.types = []
      state.status = StatusState.ERROR
      state.message = action.error.message
    })

    builder.addCase(fetchCreateType.pending, (state) => {
      state.status = StatusState.LOADING
      state.message = undefined
    })
    builder.addCase(fetchCreateType.fulfilled, (state, action: PayloadAction<TypesState>) => {
      state.types.push(action.payload)
      state.status = StatusState.SUCCESS
    })
    builder.addCase(fetchCreateType.rejected, (state, action) => {
      state.status = StatusState.ERROR
      state.message = action.error.message
    })

    builder.addCase(fetchEditType.pending, (state) => {
      state.status = StatusState.LOADING
      state.message = undefined
    })
    builder.addCase(fetchEditType.fulfilled, (state, action: PayloadAction<TypesState>) => {
      const index = state.types.findIndex((item) => item.id === action.payload.id)
      state.types.splice(index, 1, action.payload)
      state.status = StatusState.SUCCESS
    })
    builder.addCase(fetchEditType.rejected, (state, action) => {
      state.status = StatusState.ERROR
      state.message = action.error.message
    })

    builder.addCase(fetchRemoveType.pending, (state) => {
      state.status = StatusState.LOADING
      state.message = undefined
    })
    builder.addCase(fetchRemoveType.fulfilled, (state, action: PayloadAction<TypesState>) => {
      state.types = state.types.filter((item) => item.id !== action.payload.id)
      state.status = StatusState.SUCCESS
    })
    builder.addCase(fetchRemoveType.rejected, (state, action) => {
      state.status = StatusState.ERROR
      state.message = action.error.message
    })
  },
})

export const { } = typesSlice.actions

export default typesSlice.reducer