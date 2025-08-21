import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {
  getTestReport,
  getAllReports,
  executeReports,
  createReport,
  updateReport,
  removeReport,
  exportExcel,
  stramExport
} from '@api/report'

export const RemoveReport = createAsyncThunk('report/removeReport', async (data) => {
  const response = await removeReport(data)
  return response.data
})

export const UpdateReport = createAsyncThunk('report/updateReport', async (data) => {
  const response = await updateReport(data)
  return response.data
})

export const CreateReport = createAsyncThunk('report/createReport', async (data) => {
  const response = await createReport(data)
  return response.data
})

export const GetTestReport = createAsyncThunk('report/getTestReport', async (data) => {
  const response = await getTestReport(data)
  return response.data
})

export const ExecuteReports = createAsyncThunk('report/executeReports', async (data) => {
  const response = await executeReports(data)
  return response.data
})

export const GetAllReports = createAsyncThunk('report/getAllReports', async () => {
  const response = await getAllReports()
  return response.data.result
})

export const ExportExcel = createAsyncThunk('report/exportExcel', async (data) => {
  const response = await exportExcel(data)

  return response.data
})

export const StramExport = createAsyncThunk('report/stramExport', async (data) => {
  const response = await stramExport(data)
    console.log(response)
  return response
})

export const addReport = createSlice({
  name: 'addReport',
  initialState: {
    suggestions: [],
    ReportResponse: [],
    ReportList: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      
    .addCase(ExecuteReports.fulfilled, (state, action) => {
        state.ReportResponse = action.payload
      })
      
      .addCase(GetAllReports.fulfilled, (state, action) => {
        state.ReportList = action.payload
      })

  }
})

export default addReport.reducer
