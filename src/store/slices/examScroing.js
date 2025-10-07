import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { examScroing as apis } from '@api'

export const SaveExamScroring = createAsyncThunk('ExamScroring/saveExamScroring', async (param) => {
  const response = await apis.saveExamScroring(param)
  return response.data.result
})
export const GetAllExamScroring = createAsyncThunk('ExamScroring/getAllExamScroring', async () => {
  const response = await apis.getAllExamScroring()
  return response.data.result
})
export const CreateExamScroring = createAsyncThunk('ExamScroring/createExamScroring', async (param) => {
  const response = await apis.createExamScroring(param)
  return response.data.result
})
export const RemoveExamScroring = createAsyncThunk('ExamScroring/removeExamScroring', async (param) => {
  const response = await apis.removeExamScroring(param)
  return response.data.result
})
export const UpdateExamScroring = createAsyncThunk('ExamScroring/updateExamScroring', async (param) => {
  const response = await apis.updateExamScroring(param)
  return response.data.result
})

export const examScroing = createSlice({
  name: 'examScroing',
  initialState: {
    Scores: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetAllExamScroring.fulfilled, (state, action) => {
      state.Scores = action.payload
    })
  }
})

export default examScroing.reducer
