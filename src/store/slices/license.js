import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { license as apis } from '@api'
/////////////////////ScoreRatio/////////////////////
export const Getlicenses = createAsyncThunk('license/getlicenses', async () => {
  const response = await apis.getlicenses()
  return response.data.result
})
export const Createlicense = createAsyncThunk('license/createlicense', async (param) => {
  const response = await apis.createlicense(param)
  return response.data.result
})
export const Removelicense = createAsyncThunk('license/removelicense', async (param) => {
  const response = await apis.removelicense(param)
  return response.data.result
})
export const Updatelicense = createAsyncThunk('license/updatelicense', async (param) => {
  const response = await apis.updatelicense(param)
  return response.data.result
})

export const UploadFile = createAsyncThunk('license/uploadFile', async (param) => {
  const response = await apis.uploadFile(param)
  return response.data.result
})
export const ReadFile = createAsyncThunk('license/readFile', async (param) => {
  const response = await apis.readFile(param)
  return response.data.result
})

export const addReport = createSlice({
  name: 'license',
  initialState: {
    licenses: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(Getlicenses.fulfilled, (state, action) => {
      state.licenses = action.payload
    })
  }
})

export default addReport.reducer
