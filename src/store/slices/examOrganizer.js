import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { examOrganizer as apis } from '@api'
/////////////////////ScoreRatio/////////////////////
export const GetQuarantineAllSubSutes = createAsyncThunk('examOrganizer/getQuarantineAllSubSutes', async (param) => {
  const response = await apis.getQuarantineAllSubSutes(param)
  return response.data.result
})
export const GetQuarantineOfSubSite = createAsyncThunk('examOrganizer/getQuarantineOfSubSite', async (param) => {
  const response = await apis.getQuarantineOfSubSite(param)
  return response.data.result
})
export const GetRemainingReport = createAsyncThunk('examOrganizer/getRemainingReport', async (param) => {
  const response = await apis.getRemainingReport(param)
  return response.data.result
})

export const SetPrintQuarantineOfSubSite = createAsyncThunk(
  'examOrganizer/setPrintQuarantineOfSubSite',
  async (param) => {
    const response = await apis.setPrintQuarantineOfSubSite(param)
    return response.data.result
  }
)

export const SetRecevierInfo = createAsyncThunk('examOrganizer/setRecevierInfo', async (param) => {
  const response = await apis.setRecevierInfo(param)
  return response.data.result
})
// export const UploadFile = createAsyncThunk('license/uploadFile', async (param) => {
//   const response = await apis.uploadFile(param)
//   return response.data.result
// })
// export const ReadFile = createAsyncThunk('license/readFile', async (param) => {
//   const response = await apis.readFile(param)
//   return response.data.result
// })

export const examOrganizer = createSlice({
  name: 'examOrganizer',
  initialState: {
    allSubsites: [],
    subSite: [],
    remainCount: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetQuarantineAllSubSutes.fulfilled, (state, action) => {
        state.allSubsites = action.payload
      })
      .addCase(GetQuarantineOfSubSite.fulfilled, (state, action) => {
        state.subSite = action.payload
      })
      .addCase(GetRemainingReport.fulfilled, (state, action) => {
        state.remainCount = action.payload
      })
  }
})

export default examOrganizer.reducer
