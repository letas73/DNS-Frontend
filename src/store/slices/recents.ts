import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { StatusState } from '../types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { $authHost } from '../../services/axios'

export const fetchRecentsDevices = createAsyncThunk('recents/fetchRecentsDevices', async () => {
  try {
    const { data } = await $authHost.get('/recent')
    return data
  } catch (e: any) {
    throw new Error(e.response.data.message)
  }
})

interface AddRecentDeviceProps {
  title: string
  price: number
  image: string
  deviceId: number
}

export const fetchAddRecentDevice = createAsyncThunk('recents/fetchAddRecentDevice',
  async (params: AddRecentDeviceProps) => {
  try {
    const { data } = await $authHost.post('/recent', params)
    return data
  } catch (e: any) {
    throw new Error(e.response.data.message)
  }
})

export const fetchRemoveRecentDevice = createAsyncThunk('recents/fetchRemoveRecentDevice', async (id: number) => {
  try {
    const { data } = await $authHost.delete(`/recent/${id}`)
    return data
  } catch (e: any) {
    throw new Error(e.response.data.message)
  }
})

export interface RecentsState {
  id: number
  title: string
  image: string
  price: number
  deviceId: number
  createdAt?: string
  updatedAt?: string
}

interface RecentsInitialState {
  items: RecentsState[],
  status: StatusState,
  message: string | undefined
}

const initialState: RecentsInitialState = {
  items: [],
  status: StatusState.NEVER,
  message: undefined
}

export const recentsSlice = createSlice({
  name: 'recents',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecentsDevices.pending, (state) => {
      state.items = []
      state.status = StatusState.LOADING
      state.message = undefined
    })
    builder.addCase(fetchRecentsDevices.fulfilled, (state, action: PayloadAction<RecentsState[]>) => {
      state.items = action.payload
      state.status = StatusState.SUCCESS
    })
    builder.addCase(fetchRecentsDevices.rejected, (state, action) => {
      state.items = []
      state.status = StatusState.ERROR
      state.message = action.error.message
    })

    builder.addCase(fetchAddRecentDevice.pending, (state) => {
      state.items = []
      state.status = StatusState.LOADING
      state.message = undefined
    })
    builder.addCase(fetchAddRecentDevice.fulfilled, (state) => {
      state.status = StatusState.SUCCESS
    })
    builder.addCase(fetchAddRecentDevice.rejected, (state, action) => {
      state.status = StatusState.ERROR
      state.message = action.error.message
    })

    builder.addCase(fetchRemoveRecentDevice.pending, (state) => {
      state.status = StatusState.LOADING
      state.message = undefined
    })
    builder.addCase(fetchRemoveRecentDevice.fulfilled, (state, action: PayloadAction<RecentsState>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id)
      state.status = StatusState.SUCCESS
    })
    builder.addCase(fetchRemoveRecentDevice.rejected, (state, action) => {
      state.status = StatusState.ERROR
      state.message = action.error.message
    })
  },
})

export const { } = recentsSlice.actions

export default recentsSlice.reducer