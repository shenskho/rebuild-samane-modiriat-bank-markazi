import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { variableData as apis } from '@api'
/////////////////////ScoreRatio/////////////////////
export const GetScoreRatio = createAsyncThunk('variableData/getScoreRatio', async () => {
  const response = await apis.getScoreRatio()
  return response.data.result
})
export const CreateScoreRatio = createAsyncThunk('variableData/createScoreRatio', async (param) => {
  const response = await apis.createScoreRatio(param)
  return response.data.result
})
export const removeScoreRatio = createAsyncThunk('variableData/deleteScoreRatio', async (param) => {
  const response = await apis.removeScoreRatio(param)
  return response.data.result
})
export const updateScoreRatio = createAsyncThunk('variableData/updateScoreRatio', async (param) => {
  const response = await apis.updateScoreRatio(param)
  return response.data.result
})
///////////ExamAgency///////////
export const GetExamAgency = createAsyncThunk('variableData/getExamAgency', async () => {
  const response = await apis.getExamAgency()
  return response.data.result
})
export const CreateExamAgency= createAsyncThunk('variableData/createExamAgency', async (param) => {
  const response = await apis.createExamAgency(param)
  return response.data.result
})
export const removeExamAgency = createAsyncThunk('variableData/deleteExamAgency', async (param) => {
  const response = await apis.removeExamAgency(param)
  return response.data.result
})
export const updateExamAgency = createAsyncThunk('variableData/updateExamAgency', async (param) => {
  const response = await apis.updateExamAgency(param)
  return response.data.result
})
///////////ComplementEvaluationAgency///////////
export const GetComplementEvaluationAgency = createAsyncThunk('variableData/getComplementEvaluationAgency', async () => {
  const response = await apis.getComplementEvaluationAgency()
  return response.data.result
})
export const CreateComplementEvaluationAgency= createAsyncThunk('variableData/createComplementEvaluationAgency', async (param) => {
  const response = await apis.createComplementEvaluationAgency(param)
  return response.data.result
})
export const removeComplementEvaluationAgency = createAsyncThunk('variableData/deleteComplementEvaluationAgency', async (param) => {
  const response = await apis.removeComplementEvaluationAgency(param)
  return response.data.result
})
export const updateComplementEvaluationAgency = createAsyncThunk('variableData/updateComplementEvaluationAgency', async (param) => {
  const response = await apis.updateComplementEvaluationAgency(param)
  return response.data.result
})
////////////////////EducationField////
export const GetEducationField = createAsyncThunk('variableData/getEducationField', async () => {
  const response = await apis.getEducationField()
  return response.data.result
})
export const CreateEducationField= createAsyncThunk('variableData/createEducationField', async (param) => {
  const response = await apis.createEducationField(param)
  return response.data.result
})
export const removeEducationField = createAsyncThunk('variableData/deleteEducationField', async (param) => {
  const response = await apis.removeEducationField(param)
  return response.data.result
})
export const updateEducationField = createAsyncThunk('variableData/updateEducationField', async (param) => {
  const response = await apis.updateEducationField(param)
  return response.data.result
})
//////////Job////////////////
export const GetJob = createAsyncThunk('variableData/getJob', async () => {
  const response = await apis.getJob()
  return response.data.result
})
export const CreateJob= createAsyncThunk('variableData/createJob', async (param) => {
  const response = await apis.createJob(param)
  return response.data.result
})
export const removeJob = createAsyncThunk('variableData/deleteJob', async (param) => {
  const response = await apis.removeJob(param)
  return response.data.result
})
export const updateJob = createAsyncThunk('variableData/updateJob', async (param) => {
  const response = await apis.updateJob(param)
  return response.data.result
})
/////////////////SelectionState/////////////////////////
export const GetSelectionState = createAsyncThunk('variableData/getSelectionState', async () => {
  const response = await apis.getSelectionState()
  return response.data.result
})
export const CreateSelectionState= createAsyncThunk('variableData/createSelectionState', async (param) => {
  const response = await apis.createSelectionState(param)
  return response.data.result
})
export const removeSelectionState = createAsyncThunk('variableData/deleteSelectionState', async (param) => {
  const response = await apis.removeSelectionState(param)
  return response.data.result
})
export const updateSelectionState = createAsyncThunk('variableData/updateSelectionState', async (param) => {
  const response = await apis.updateSelectionState(param)
  return response.data.result
})
////////////////AgencyCategory////////////
export const GetAgencyCategory = createAsyncThunk('variableData/getAgencyCategory', async () => {
  const response = await apis.getAgencyCategory()
  return response.data.result
})
export const CreateAgencyCategory= createAsyncThunk('variableData/createAgencyCategory', async (param) => {
  const response = await apis.createAgencyCategory(param)
  return response.data.result
})
export const removeAgencyCategory = createAsyncThunk('variableData/deleteAgencyCategory', async (param) => {
  const response = await apis.removeAgencyCategory(param)
  return response.data.result
})
export const updateAgencyCategory = createAsyncThunk('variableData/updateAgencyCategory', async (param) => {
  const response = await apis.updateAgencyCategory(param)
  return response.data.result
})













export const addReport = createSlice({
  name: 'variableData',
  initialState: {
    ScoreRatio:[],
    ExamAgency:[],
    ComplementEvaluationAgency:[],
    EducationField:[],
    Job:[],
    SelectionState:[],
    AgencyCategory:[],
  },
  reducers: {},
  extraReducers: (builder) => {
     builder.addCase(GetAgencyCategory.fulfilled, (state, action) => {
      state.AgencyCategory = action.payload
    })
    builder.addCase(GetSelectionState.fulfilled, (state, action) => {
      state.SelectionState = action.payload
    })
    builder.addCase(GetScoreRatio.fulfilled, (state, action) => {
      state.ScoreRatio = action.payload
    })
    builder.addCase(GetExamAgency.fulfilled, (state, action) => {
      state.ExamAgency = action.payload
    })
    builder.addCase(GetComplementEvaluationAgency.fulfilled, (state, action) => {
      state.ComplementEvaluationAgency = action.payload
    })
      builder.addCase(GetEducationField.fulfilled, (state, action) => {
      state.EducationField = action.payload
    })
      builder.addCase(GetJob.fulfilled, (state, action) => {
      state.Job = action.payload
    })
   
  },
})


export default addReport.reducer