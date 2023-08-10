import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface SortInitialState {
  brandId: number | null
  typeId: number | null
  searchValue: string
}

const initialState: SortInitialState = {
  brandId: null,
  typeId: null,
  searchValue: ''
}

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setBrandId: (state, action: PayloadAction<number | null>) => {
      state.brandId = action.payload
    },
    setTypeId: (state, action: PayloadAction<number | null>) => {
      state.typeId = action.payload
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    }
  }
})

export const { setBrandId, setTypeId, setSearchValue } = sortSlice.actions

export default sortSlice.reducer