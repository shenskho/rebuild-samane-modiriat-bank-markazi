import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { scopeUser as apis } from '@api'

export const GetScopeTicket = createAsyncThunk('scopeUser/getScopeTicket', async (param) => {
  const response = await apis.getScopeTicket(param)
  return response.data.result
})

export const CreateScopeTicket = createAsyncThunk('scopeUser/createScopeTicket', async (param) => {
  const response = await apis.createScopeTicket(param)
  return response.data.result
})
export const GetUser = createAsyncThunk('scopeUser/GetUserer', async (param) => {
  const response = await apis.getUser(param)
  return response.data.result
})

export const GetScopeusers = createAsyncThunk('scopeUser/getScopeusers', async () => {
  const response = await apis.getScopeusers()
  return response.data.result
})
export const GetMeetingRecordType = createAsyncThunk('scopeUser/getMeetingRecordType', async () => {
  const response = await apis.getMeetingRecordType()
  return response.data.result
})
export const CreateMeetingRecordType = createAsyncThunk('scopeUser/createMeetingRecordType', async (param) => {
  const response = await apis.createMeetingRecordType(param)
  return response.data.result
})

export const UpdateMeetingRecordType = createAsyncThunk('scopeUser/updateMeetingRecordType', async () => {
  const response = await apis.updateMeetingRecordType()
  return response.data.result
})
export const RemoveMeetingRecordType = createAsyncThunk('scopeUser/removeMeetingRecordType', async (param) => {
  const response = await apis.removeMeetingRecordType(param)
  return response.data.result
})
export const CreateMeetingRecord = createAsyncThunk('scopeUser/createMeetingRecord', async (param) => {
  const response = await apis.createMeetingRecord(param)
  return response.data.result
})

export const GetMeetingRecord = createAsyncThunk('scopeUser/getMeetingRecord', async (param) => {
  const response = await apis.getMeetingRecord(param)
  return response.data.result
})

export const UpdateMeetingRecord = createAsyncThunk('scopeUser/updateMeetingRecord', async (param) => {
  const response = await apis.updateMeetingRecord(param)
  return response.data.result
})

export const RemoveMeetingRecord = createAsyncThunk('scopeUser/removeMeetingRecord', async (param) => {
  const response = await apis.removeMeetingRecord(param)
  return response.data.result
})

export const UploadFile = createAsyncThunk('scopeUser/uploadFile', async (param) => {
  const response = await apis.uploadLargeFile(param)
  return response.data.result
})
export const ReadFile = createAsyncThunk('scopeUser/readFile', async (param) => {
  const response = await apis.readFile(param)
  return response.data
})

export const scopeUser = createSlice({
  name: 'scopeUser',
  initialState: {
    MeetingRecordType: [],
    MeetingRecord: [],
    ScopeUsers: [],
    ScopeTicket: [],
    UserDetail: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetMeetingRecordType.fulfilled, (state, action) => {
        state.MeetingRecordType = action.payload
      })
      .addCase(GetMeetingRecord.fulfilled, (state, action) => {
        state.MeetingRecord = action.payload
      })
      .addCase(GetScopeusers.fulfilled, (state, action) => {
        state.ScopeUsers = action.payload
      })
      .addCase(GetScopeTicket.fulfilled, (state, action) => {
        state.ScopeTicket = action.payload
      })

      .addCase(GetUser.fulfilled, (state, action) => {
        state.UserDetail = action.payload
      })
  }
})

export default scopeUser.reducer
