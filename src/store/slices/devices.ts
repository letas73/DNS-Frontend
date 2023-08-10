import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { StatusState } from '../types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { $authHost, $host } from '../../services/axios'
import { InfoState } from '../../pages/admin/components/admin-product/AdminProduct'

interface FetchDevicesProps {
  typeId?: number | null
  brandId?: number | null
  limit?: number
  page?: number
  sortPrice: string
}

interface CreateDeviceProps {
  title: string
  price: number
  typeId?: number
  brandId?: number
  image: string
  info: [{
    title: string
    text: string
  }]
}

export const fetchDevices = createAsyncThunk('devices/fetchDevices', async ({ typeId, brandId, sortPrice, limit, page }: FetchDevicesProps) => {
  try {
    const { data } = await $host.get('/device', { params: { typeId, brandId, sortPrice, limit, page } })
    return data
  } catch (e: any) {
    throw new Error(e.response.data.message)
  }
})

export const fetchCreateDevice = createAsyncThunk('devices/fetchCreateDevice', async (params: any) => {
  try {
    const { data } = await $authHost.post('/device', params)
    return data
  } catch (e: any) {
    throw new Error(e.response.data.message)
  }
})

interface EditDeviceProps {
  id: number
  title: string
  price: number
  typeId?: number
  brandId?: number
  image: string
}

export const fetchEditDevice = createAsyncThunk('devices/fetchEditDevice', async ({ id, title, price, typeId, brandId, image }: EditDeviceProps) => {
  try {
    const { data } = await $authHost.put(`/device/${id}`, { title, price, typeId, brandId, image })
    return data
  } catch (e: any) {
    throw new Error(e.response.data.message)
  }
})

export const fetchRemoveDevice = createAsyncThunk('devices/fetchRemoveDevice', async (id: number) => {
  try {
    const { data } = await $authHost.delete(`/device/${id}`)
    return data
  } catch (e: any) {
    throw new Error(e.response.data.message)
  }
})

export interface DeviceInfo {
  id: number
  title: string
  text: string
  deviceId: number
}

export interface DeviceState {
  id: number,
  title: string,
  image: string,
  price: number
  typeId: number
  brandId: number
  info: DeviceInfo[]
}

interface DevicesState {
  rows: DeviceState[],
  count: number
}

interface DevicesInitialState {
  items: DevicesState | null,
  status: StatusState,
  message: string | undefined
}

const initialState: DevicesInitialState = {
  items: null,
  status: StatusState.NEVER,
  message: undefined
}

export const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchDevices.pending, (state) => {
      state.items = null
      state.status = StatusState.LOADING
      state.message = undefined
    })
    builder.addCase(fetchDevices.fulfilled, (state, action: PayloadAction<DevicesState>) => {
      state.items = action.payload
      state.status = StatusState.SUCCESS
    })
    builder.addCase(fetchDevices.rejected, (state, action) => {
      state.items = null
      state.status = StatusState.ERROR
      state.message = action.error.message
    })

    builder.addCase(fetchCreateDevice.pending, (state) => {
      state.status = StatusState.LOADING
      state.message = undefined
    })
    builder.addCase(fetchCreateDevice.fulfilled, (state, action: PayloadAction<DeviceState>) => {
      state.items?.rows.push(action.payload)
      state.status = StatusState.SUCCESS
    })
    builder.addCase(fetchCreateDevice.rejected, (state, action) => {
      state.status = StatusState.ERROR
      state.message = action.error.message
    })

    builder.addCase(fetchEditDevice.pending, (state) => {
      state.status = StatusState.LOADING
      state.message = undefined
    })
    builder.addCase(fetchEditDevice.fulfilled, (state, action: PayloadAction<DeviceState>) => {
      if (state.items) {
        const index = state.items.rows.findIndex((item) => item.id === action.payload.id)
        state.items.rows.splice(index, 1, action.payload)
      }
      state.status = StatusState.SUCCESS
    })
    builder.addCase(fetchEditDevice.rejected, (state, action) => {
      state.status = StatusState.ERROR
      state.message = action.error.message
    })

    builder.addCase(fetchRemoveDevice.pending, (state) => {
      state.status = StatusState.LOADING
      state.message = undefined
    })
    builder.addCase(fetchRemoveDevice.fulfilled, (state, action: PayloadAction<DeviceState>) => {
      if (state.items?.rows) {
        state.items.rows = state.items.rows.filter((item) => item.id !== action.payload.id)
      }
      state.status = StatusState.SUCCESS
    })
    builder.addCase(fetchRemoveDevice.rejected, (state, action) => {
      state.status = StatusState.ERROR
      state.message = action.error.message
    })
  },
})

export const { } = devicesSlice.actions

export default devicesSlice.reducer