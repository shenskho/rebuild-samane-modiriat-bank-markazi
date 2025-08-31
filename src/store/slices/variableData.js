import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { variableData as apis } from '@api'
import { getProvince } from '@api/variableData'
import { getEducationLevel } from '@api/variableData'
import { getOrganization } from '@api/variableData'
/////////////////ExternalImport////////////////////

export const Getactivity = createAsyncThunk('variableData/getactivity', async () => {
  const response = await apis.getactivity()
  return response.data.result
})
export const GetProvince = createAsyncThunk('variableData/getProvince', async () => {
  const response = await apis.getProvince()
  return response.data.result
})
export const GetEducationLevel = createAsyncThunk('variableData/getEducationLevel', async () => {
  const response = await apis.getEducationLevel()
  return response.data.result
})
export const updateEducationLevel = createAsyncThunk('variableData/updateEducationLevel', async (param) => {
  const response = await apis.updateEducationLevel(param)
  return response.data.result
})
export const GetOrganization = createAsyncThunk('variableData/getOrganization', async () => {
  const response = await apis.getOrganization()
  return response.data.result
})
export const GetUniversityType = createAsyncThunk('variableData/getUniversityType', async () => {
  const response = await apis.getUniversityType()
  return response.data.result
})


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
export const CreateExamAgency = createAsyncThunk('variableData/createExamAgency', async (param) => {
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
export const GetComplementEvaluationAgency = createAsyncThunk(
  'variableData/getComplementEvaluationAgency',
  async () => {
    const response = await apis.getComplementEvaluationAgency()
    return response.data.result
  }
)
export const CreateComplementEvaluationAgency = createAsyncThunk(
  'variableData/createComplementEvaluationAgency',
  async (param) => {
    const response = await apis.createComplementEvaluationAgency(param)
    return response.data.result
  }
)
export const removeComplementEvaluationAgency = createAsyncThunk(
  'variableData/deleteComplementEvaluationAgency',
  async (param) => {
    const response = await apis.removeComplementEvaluationAgency(param)
    return response.data.result
  }
)
export const updateComplementEvaluationAgency = createAsyncThunk(
  'variableData/updateComplementEvaluationAgency',
  async (param) => {
    const response = await apis.updateComplementEvaluationAgency(param)
    return response.data.result
  }
)
////////////////////EducationField////
export const GetEducationField = createAsyncThunk('variableData/getEducationField', async () => {
  const response = await apis.getEducationField()
  return response.data.result
})
export const CreateEducationField = createAsyncThunk('variableData/createEducationField', async (param) => {
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
export const CreateJob = createAsyncThunk('variableData/createJob', async (param) => {
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
export const CreateSelectionState = createAsyncThunk('variableData/createSelectionState', async (param) => {
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
export const CreateAgencyCategory = createAsyncThunk('variableData/createAgencyCategory', async (param) => {
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
//////////////University//////////////////
export const GetUniversity = createAsyncThunk('variableData/getUniversity', async () => {
  const response = await apis.getUniversity()
  return response.data.result
})
export const CreateUniversity = createAsyncThunk('variableData/createUniversity', async (param) => {
  const response = await apis.createUniversity(param)
  return response.data.result
})
export const removeUniversity = createAsyncThunk('variableData/deleteUniversity', async (param) => {
  const response = await apis.removeUniversity(param)
  return response.data.result
})
export const updateUniversity = createAsyncThunk('variableData/updateUniversity', async (param) => {
  const response = await apis.updateUniversity(param)
  return response.data.result
})

export const addReport = createSlice({
  name: 'variableData',
  initialState: {
    ScoreRatio: [],
    ExamAgency: [],
    ComplementEvaluationAgency: [],
    EducationField: [],
    Job: [],
    SelectionState: [],
    AgencyCategory: [],
    University: [],
    provinces: [],
    activitys: [],
    EducationLevel:[],
    Organization:[],
    UniversityType:[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetUniversityType.fulfilled, (state, action) => {
        state.UniversityType = action.payload
      })
      .addCase(GetOrganization.fulfilled, (state, action) => {
        state.Organization = action.payload
      })
      .addCase(GetUniversity.fulfilled, (state, action) => {
        state.University = action.payload
      })
      .addCase(GetAgencyCategory.fulfilled, (state, action) => {
        state.AgencyCategory = action.payload
      })
      .addCase(GetSelectionState.fulfilled, (state, action) => {
        state.SelectionState = action.payload
      })
      .addCase(GetScoreRatio.fulfilled, (state, action) => {
        state.ScoreRatio = action.payload
      })
      .addCase(GetExamAgency.fulfilled, (state, action) => {
        state.ExamAgency = action.payload
      })
      .addCase(GetComplementEvaluationAgency.fulfilled, (state, action) => {
        state.ComplementEvaluationAgency = action.payload
      })
      .addCase(GetEducationField.fulfilled, (state, action) => {
        state.EducationField = action.payload
      })
      .addCase(GetJob.fulfilled, (state, action) => {
        state.Job = action.payload
      })
       .addCase(GetProvince.fulfilled, (state, action) => {
        state.provinces = action.payload
      })
       .addCase(Getactivity.fulfilled, (state, action) => {
        state.activitys = action.payload
      })  .addCase(GetEducationLevel.fulfilled, (state, action) => {
        state.EducationLevel = action.payload
      })
  }
  
})

export default addReport.reducer
