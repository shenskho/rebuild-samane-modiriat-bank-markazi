import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { fixData as apis } from '@api'

export const GetDutystatus = createAsyncThunk('fixData/getDutystatus', async () => {
  const response = await apis.getDutystatus()
  return response.data.result
})

export const addReport = createSlice({
  name: 'fixData',
  initialState: {
    dutyStatus: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetDutystatus.fulfilled, (state, action) => {
      state.dutyStatus = action.payload
    })
  }
})

export default addReport.reducer
