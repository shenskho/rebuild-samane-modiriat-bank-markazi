import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { booklet as apis } from '@api'
/////////////////////ScoreRatio/////////////////////
export const UploadAnswerKeys = createAsyncThunk('Booklet/uploadAnswerKeys', async (param) => {
 
  const response = await apis.uploadAnswerKeys(param,1)
  return response.data.result
})
export const GetAnswareKeyStatus = createAsyncThunk('Booklet/getAnswareKeyStatus', async (param) => {
  const response = await apis.getAnswareKeyStatus(param)
  return response.data.result
})
export const ProcessAnswerKeys = createAsyncThunk('Booklet/processAnswerKeys', async (param) => {
  const response = await apis.processAnswerKeys(param)
  return response.data.result
})
export const ProcessAnswerKeysStatus = createAsyncThunk('Booklet/processAnswerKeysStatus', async (param) => {
  const response = await apis.processAnswerKeysStatus(param)
  return response.data.result
})
////////////////////BookletAnswerKey/////////////////
export const getallBookletKeys = createAsyncThunk('Booklet/getallBookletKeys', async (param) => {
  const response = await apis.getallBookletKeys(param)
  return response.data.result
})
export const getBookletAnswareKeys = createAsyncThunk('Booklet/getBookletAnswareKeys', async (param) => {
  const response = await apis.getBookletAnswareKeys(param)
  return response.data.result
})
export const getBookletKeys = createAsyncThunk('Booklet/getBookletKeys', async (param) => {
  const response = await apis.getBookletKeys(param)
  return response.data.result
})
export const createBookKetAnswareKey = createAsyncThunk('Booklet/createBookKetAnswareKey', async (param) => {
  const response = await apis.createBookKetAnswareKey(param)
  return response.data.result
})
export const removerAnswareKey = createAsyncThunk('Booklet/removerAnswareKey', async (param) => {
  const response = await apis.removerAnswareKey(param)
  return response.data.result
})
export const updateAnswareKey = createAsyncThunk('Booklet/updateAnswareKey', async (param) => {
  const response = await apis.updateAnswareKey(param)
  return response.data.result
})
///////////////////BookletJob/////////////
export const getAllBookletJobs = createAsyncThunk('Booklet/getAllBookletJobs', async (param) => {
  const response = await apis.getAllBookletJobs(param)
  return response.data.result
})
export const getAllBookletJobsPagination = createAsyncThunk('Booklet/getAllBookletJobsPagination', async (param) => {
  const response = await apis.getAllBookletJobsPagination(param)
  return response.data.result
})
export const getBookletJobId = createAsyncThunk('Booklet/getBookletJobId', async (param) => {
  const response = await apis.getBookletJobId(param)
  return response.data.result
})
export const createBookletJob = createAsyncThunk('Booklet/createBookletJob', async (param) => {
  const response = await apis.createBookletJob(param)
  return response.data.result
})
export const updateBookletJob = createAsyncThunk('Booklet/updateBookletJob', async (param) => {
  const response = await apis.updateBookletJob(param)
  return response.data.result
})
export const deleteBookletJob = createAsyncThunk('Booklet/deleteBookletJob', async (param) => {
  const response = await apis.deleteBookletJob(param)
  return response.data.result
})
/////////////////////BookletQuestion//////////
export const getAllBookletQuestionsSection = createAsyncThunk('Booklet/getAllBookletQuestionsSection', async (param) => {
  const response = await apis.getAllBookletQuestionsSection(param)
  return response.data.result
})
export const getAllBookletQuestionSectionPagination = createAsyncThunk('Booklet/getAllBookletQuestionSectionPagination', async (param) => {
  const response = await apis.getAllBookletQuestionSectionPagination(param)
  return response.data.result
})
export const getAllBookletQuestionSectionId = createAsyncThunk('Booklet/getAllBookletQuestionSectionId', async (param) => {
  const response = await apis.getAllBookletQuestionSectionId(param)
  return response.data.result
})
export const createBookletQuestionSection = createAsyncThunk('Booklet/createBookletQuestionSection', async (param) => {
  const response = await apis.createBookletQuestionSection(param)
  return response.data.result
})
export const updateBookletQuestionSection = createAsyncThunk('Booklet/updateBookletQuestionSection', async (param) => {
  const response = await apis.updateBookletQuestionSection(param)
  return response.data.result
})
export const deleteBookletQuestionSection = createAsyncThunk('Booklet/deleteBookletQuestionSection', async (param) => {
  const response = await apis.deleteBookletQuestionSection(param)
  return response.data.result
})





export const Booklet = createSlice({
  name: 'Booklet',
  initialState: {
    BookletKeys: [],
    BookletJobs: [],
    BookletQuestionsSection:[],
    AnswareKeyStatus: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getallBookletKeys.fulfilled, (state, action) => {
      state.BookletKeys = action.payload
    }).addCase(getallBookletKeys.rejected, (state, action) => {
      state.BookletKeys = action.payload
    }).addCase(getAllBookletJobs.rejected, (state, action) => {
      state.BookletJobs = action.payload
    }).addCase(getAllBookletQuestionsSection.rejected, (state, action) => {
      state.BookletQuestionsSection = action.payload
    }).addCase(GetAnswareKeyStatus.rejected, (state, action) => {
      state.AnswareKeyStatus = action.payload
    })
  } 
})

export default Booklet.reducer
