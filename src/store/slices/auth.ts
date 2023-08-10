import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { StatusState } from '../types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { $authHost } from '../../services/axios'
import { AuthFormProps } from '../../components/register-modal/RegisterModal'
import { ValuesFormParams } from '../../components/reset-modal/ResetModal'

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params: AuthFormProps) => {
  try {
    const { data } = await $authHost.post('/user/register', params)
    window.localStorage.setItem('token', data.token)
    return data
  } catch (e: any) {
    throw new Error(e.response.data.message)
  }
})

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params: AuthFormProps) => {
  try {
    const { data } = await $authHost.post('/user/login', params)
    window.localStorage.setItem('token', data.token)
    return data
  } catch (e: any) {
    throw new Error(e.response.data.message)
  }
})

export const fetchReset = createAsyncThunk('auth/fetchReset', async (params: ValuesFormParams) => {
  try {
    const { data } = await $authHost.patch('/user/reset', params)
    return data
  } catch (e: any) {
    throw new Error(e.response.data.message)
  }
})

export const fetchRemove = createAsyncThunk('auth/fetchRemove', async (id: number | undefined) => {
  try {
    const { data } = await $authHost.delete(`/user/remove/${id}`)
    window.localStorage.removeItem('token')
    return data
  } catch (e: any) {
    throw new Error(e.response.data.message)
  }
})

export const fetchMe = createAsyncThunk('auth/fetchMe', async () => {
  try {
    const { data } = await $authHost.get('/user/check')
    return data
  } catch (e: any) {
    throw new Error(e.response.data.message)
  }
})

export interface UserData {
  id: number
  email: string
  password: string,
  role: string
  updatedAt: string
  createdAt: string
}

interface AuthDataState {
  user: UserData
  token?: string
}

interface AuthInitialState {
  data: AuthDataState | null,
  status: StatusState,
  message: string | undefined
}

const initialState: AuthInitialState = {
  data: null,
  status: StatusState.NEVER,
  message: undefined
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.status = StatusState.NEVER
      state.data = null
      window.localStorage.removeItem('token')
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegister.pending, (state) => {
      state.data = null
      state.status = StatusState.LOADING
      state.message = undefined
    })
    builder.addCase(fetchRegister.fulfilled, (state, action: PayloadAction<AuthDataState>) => {
      state.data = action.payload
      state.status = StatusState.SUCCESS
    })
    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.data = null
      state.status = StatusState.ERROR
      state.message = action.error.message
    })

    builder.addCase(fetchLogin.pending, (state) => {
      state.data = null
      state.status = StatusState.LOADING
      state.message = undefined
    })
    builder.addCase(fetchLogin.fulfilled, (state, action: PayloadAction<AuthDataState>) => {
      state.data = action.payload
      state.status = StatusState.SUCCESS
    })
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.data = null
      state.status = StatusState.ERROR
      state.message = action.error.message
    })

    builder.addCase(fetchReset.pending, (state) => {
      state.status = StatusState.LOADING
      state.message = undefined
    })
    builder.addCase(fetchReset.fulfilled, (state, action: PayloadAction<AuthDataState>) => {
      state.data = action.payload
      state.status = StatusState.SUCCESS
    })
    builder.addCase(fetchReset.rejected, (state, action) => {
      state.status = StatusState.ERROR
      state.message = action.error.message
    })

    builder.addCase(fetchMe.pending, (state) => {
      state.data = null
      state.status = StatusState.LOADING
      state.message = undefined
    })
    builder.addCase(fetchMe.fulfilled, (state, action: PayloadAction<AuthDataState>) => {
      state.data = action.payload
      state.status = StatusState.SUCCESS
    })
    builder.addCase(fetchMe.rejected, (state, action) => {
      state.data = null
      state.status = StatusState.ERROR
      state.message = action.error.message
    })

    builder.addCase(fetchRemove.pending, (state) => {
      state.status = StatusState.LOADING
      state.message = undefined
    })
    builder.addCase(fetchRemove.fulfilled, (state) => {
      state.data = null
      state.status = StatusState.SUCCESS
    })
    builder.addCase(fetchRemove.rejected, (state, action) => {
      state.status = StatusState.ERROR
      state.message = action.error.message
    })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer