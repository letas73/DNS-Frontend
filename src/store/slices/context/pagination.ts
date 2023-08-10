import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface PaginationInitialState {
  totalCount: number
  limit: number
  page: number
}

const initialState: PaginationInitialState = {
  totalCount: 0,
  limit: 4,
  page: 1
}

export const paginationSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    }
  }
})

export const { setTotalCount, setPage } = paginationSlice.actions

export default paginationSlice.reducer