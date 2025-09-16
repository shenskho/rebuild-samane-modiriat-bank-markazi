import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { operators as apis } from '@api'
/////////////////////ScoreRatio/////////////////////
export const GetTickets = createAsyncThunk('operator/getTickets', async ({ page, pageSize }) => {
  const response = await apis.getTickets(page, pageSize)
  return response.data.result
})

export const AnswareTicket = createAsyncThunk('operator/answareTicket', async (param) => {
  const response = await apis.answareTicket(param)
  return response.data.result
})

export const TakeTicket = createAsyncThunk('operator/takeTicket', async (param) => {
  const response = await apis.takeTicket(param)
  return response.data.result
})
export const GetTicket = createAsyncThunk('operator/getTicket', async (param) => {
  const response = await apis.getTicket(param)
  return response.data.result
})
export const GetUseretTicket = createAsyncThunk('operator/getUser', async (param) => {
  const response = await apis.getUser(param)
  return response.data.result
})
export const EditUser = createAsyncThunk('operator/editUser', async (param) => {
  const response = await apis.editUser(param)
  return response.data.result
})

export const Removelicense = createAsyncThunk('operator/removelicense', async (param) => {
  const response = await apis.removelicense(param)
  return response.data.result
})
export const Updatelicense = createAsyncThunk('operator/updatelicense', async (param) => {
  const response = await apis.updatelicense(param)
  return response.data.result
})

export const UploadFile = createAsyncThunk('operator/uploadFile', async (param) => {
  const response = await apis.uploadFile(param)
  return response.data.result
})
export const ReadFile = createAsyncThunk('operator/readFile', async (param) => {
  const response = await apis.readFile(param)
  return response.data
})

export const addReport = createSlice({
  name: 'operator',
  initialState: {
    licenses: [],
    tickets: [],
    totalCount: 0
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetTickets.fulfilled, (state, action) => {
      state.tickets = action.payload.items
      state.totalCount = action.payload.totalCount
    })
  }
})

export default addReport.reducer
