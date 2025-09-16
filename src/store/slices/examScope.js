import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { examScope as apis } from '@api'

import { getAttendance, getChaireNumber, getMatchImage, getAllScopes } from '@api/examScope'

/////////////////////main/////////////////////

export const GetExamScope = createAsyncThunk('examScope/getExamScope', async () => {
  const response = await apis.getExamScope()
  return response.data.result
})

export const CreateExamScope = createAsyncThunk('examScope/createExamScope', async (param) => {
  const response = await apis.createExamScope(param)
  return response.data.result
})

export const UpdateExamScope = createAsyncThunk('examScope/updateExamScope', async (param) => {
  const response = await apis.updateExamScope(param)
  return response.data.result
})

export const RemoveExamScope = createAsyncThunk('examScope/removeExamScope', async (param) => {
  const response = await apis.removeExamScope(param)
  return response.data.result
})

/////////////////////[secound]////////////////////////

export const GetExamScopeSecound = createAsyncThunk('examScope/getExamScopeSecound', async () => {
  const response = await apis.getExamScopeSecound()
  return response.data.result
})

export const CreateExamScopeSecound = createAsyncThunk('examScope/createExamScopeSecound', async (param) => {
  const response = await apis.createExamScopeSecound(param)
  return response.data.result
})

export const UpdateExamScopeSecound = createAsyncThunk('examScope/updateExamScopeSecound', async (param) => {
  const response = await apis.updateExamScopeSecound(param)
  return response.data.result
})

export const RemoveExamScopeSecound = createAsyncThunk('examScope/removeExamScopeSecound', async (param) => {
  const response = await apis.removeExamScopeSecound(param)
  return response.data.result
})

////////////////////////////[extra]/////////////////////

export const GetProvince = createAsyncThunk('examScope/getProvince', async () => {
  const response = await apis.getProvince()
  return response.data.result
})

export const GetCity = createAsyncThunk('examScope/getCity', async (param) => {
  const response = await apis.getCity(param)
  return response.data.result
})

///////////////////////ExamAllocation///////////////////////
export const SetExamAllocation = createAsyncThunk('examScope/setExamAllocation', async (param) => {
  const response = await apis.setExamAllocation(param)
  return response.data.result
})
///////////////////////Reports///////////////////////

export const GetMatchImage = createAsyncThunk('examScope/getMatchImage', async (param) => {
  const response = await apis.getMatchImage(param)
  return response.data
})

export const GetAttendance = createAsyncThunk('examScope/getAttendance', async (param) => {
  const response = await apis.getAttendance(param)
  return response.data
})

export const GetChaireNumber = createAsyncThunk('examScope/getChaireNumber', async (param) => {
  const response = await apis.getChaireNumber(param)
  return response.data
})

export const GetPersonalAnswer = createAsyncThunk('examScope/getPersonalAnswer', async (param) => {
  const response = await apis.getPersonalAnswer(param)
  return response.data
})
export const GetSubsiteHelp = createAsyncThunk('examScope/getSubsiteHelp', async (param) => {
  const response = await apis.getSubsiteHelp(param)
  return response.data
})
export const GetAllScopes = createAsyncThunk('examScope/getAllScopes', async (param) => {
  const response = await apis.getAllScopes(param)
  return response.data
})
export const GetAllAnware = createAsyncThunk('examScope/getAllAnware', async (param) => {
  const response = await apis.getAllAnware(param)
  return response.data
})

export const GetAllfinalExam = createAsyncThunk('examScope/getAllfinalExam', async (param) => {
  const response = await apis.getAllfinalExam(param)
  return response.data
})
/////////////////////////////////IntroductionExams///////////
export const GetIntroductionExams = createAsyncThunk('examScope/getIntroductionExams', async () => {
  const response = await apis.getIntroductionExams()
  return response.data.result
})

export const CreateIntroductionExams = createAsyncThunk('examScope/createIntroductionExams', async (param) => {
  const response = await apis.createIntroductionExams(param)
  return response.data.result
})

export const UpdateIntroductionExams = createAsyncThunk('examScope/updateIntroductionExams', async (param) => {
  const response = await apis.updateIntroductionExams(param)
  return response.data.result
})

export const RemoveIntroductionExams = createAsyncThunk('examScope/removeIntroductionExams', async (param) => {
  const response = await apis.removeIntroductionExams(param)
  return response.data.result
})



export const examScope = createSlice({
  name: 'examScope',
  initialState: {
    mainScopes: [],
    secoundScopes: [],
    citys: [],
    province: [],
    IntroductionExams:[]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(GetExamScope.fulfilled, (state, action) => {
        state.mainScopes = action.payload
      })
      .addCase(GetIntroductionExams.fulfilled, (state, action) => {
        state.IntroductionExams = action.payload
      })
      .addCase(GetExamScopeSecound.fulfilled, (state, action) => {
        state.secoundScopes = action.payload
      })
      .addCase(GetCity.fulfilled, (state, action) => {
        state.citys = action.payload
      })
      .addCase(GetProvince.fulfilled, (state, action) => {
        state.province = action.payload
      })
  }
})

export default examScope.reducer
