import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { operators as apis } from '@api'





export const GetApplicantChanges = createAsyncThunk('operator/getApplicantChanges', async (param) => {
  const response = await apis.getApplicantChanges(param)
  return response.data.result
})
export const GetMeetingRecord = createAsyncThunk('operator/getMeetingRecord', async () => {
  const response = await apis.getMeetingRecord()
  return response.data.result
})
export const GetMeetingRecordReport = createAsyncThunk('operator/getMeetingRecordReport', async () => {
  const response = await apis.getMeetingRecordReport()
  return response.data.result
})
export const CreateMeetingRecord = createAsyncThunk('operator/createMeetingRecord', async (param) => {
  const response = await apis.createMeetingRecord(param)
  return response.data.result
})
export const UpdateMeetingRecord = createAsyncThunk('operator/updateMeetingRecord', async (param) => {
  const response = await apis.updateMeetingRecord(param)
  return response.data.result
})

export const RemoveMeetingRecord = createAsyncThunk('operator/removeMeetingRecord', async (param) => {
  const response = await apis.removeMeetingRecord(param)
  return response.data.result
})

export const GetTickets = createAsyncThunk('operator/getTickets', async () => {
  const response = await apis.getTickets()
  return response.data.result
})
export const GetScopeTicket = createAsyncThunk('operator/getScopeTicket', async (param) => {
  const response = await apis.getScopeTicket(param)
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
  const response = await apis.getTickets(param)
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
    MeetingReports: [],
    Meetings: [],
    ScopeTicket: [],
    UserChange:[]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetTickets.fulfilled, (state, action) => {
        state.tickets = action.payload
      })
      .addCase(GetMeetingRecordReport.fulfilled, (state, action) => {
        state.MeetingReports = action.payload
      })
      .addCase(GetMeetingRecord.fulfilled, (state, action) => {
        state.Meetings = action.payload
      })
      .addCase(GetScopeTicket.fulfilled, (state, action) => {
        state.ScopeTicket = action.payload
      })
  .addCase(GetApplicantChanges.fulfilled, (state, action) => {
        state.UserChange = action.payload
      })
 

  }
})

export default addReport.reducer
