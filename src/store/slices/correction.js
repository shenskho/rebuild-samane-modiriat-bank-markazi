import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { correction as apis } from '@api'
export const ProcessCandidateResultSteap1 = createAsyncThunk('correction/processCandidateResultSteap1', async () => {
  const response = await apis.processCandidateResultSteap1()

  return response.data.result
})
export const CalculateCandidateRawScoresSteap2 = createAsyncThunk('correction/calculateCandidateRawScoresSteap2', async () => {
  const response = await apis.calculateCandidateRawScoresSteap2()

  return response.data.result
})
export const CalculateCandidateScores = createAsyncThunk('correction/calculateCandidateScores', async () => {
  const response = await apis.calculateCandidateScores()

  return response.data.result
})
export const CalculateCandidateScoresStatus = createAsyncThunk('correction/calculateCandidateScoresStatus', async (param) => {
  const response = await apis.calculateCandidateScoresStatus(param)

  return response.data.result
})
export const GenerateRanking = createAsyncThunk('correction/generateRanking', async () => {
  const response = await apis.generateRanking()

  return response.data.result
})
export const GenerateRankingStatus = createAsyncThunk('correction/generateRankingStatus', async (param) => {
  const response = await apis.generateRankingStatus(param)

  return response.data.result
})
export const GenerateReportCards = createAsyncThunk('correction/generateReportCards', async () => {
  const response = await apis.generateReportCards()

  return response.data.result
})
export const GenerateReportCardsStatus = createAsyncThunk('correction/generateReportCardsStatus', async (param) => {
  const response = await apis.generateReportCardsStatus(param)

  return response.data.result
})

export const GetfinalExel = createAsyncThunk('correction/getfinalExel', async () => {
  const response = await apis.getfinalExel()

  return response.data
})




/////////////////////Booklet/////////////////////

// export const GetAllCandidate = createAsyncThunk('Candidate/getAllCandidate', async (param) => {
//   const response = await apis.getAllCandidate(param)

//   return response.data.result
// })

// export const UploadAnswerCandidate = createAsyncThunk('Candidate/uploadAnswerCandidate', async (param) => {
//   const response = await apis.uploadAnswerCandidate(param, 1)
//   return response.data.result
// })

export const correction = createSlice({
  name: 'correction',
  initialState: {
    BookletsCadidate: [],
    BookletQuestionsSection: [],
    AnswareCadidateStatus: [],
    ProcessFinalResultStartStatus: []
  },
  reducers: {},
  extraReducers: (builder) => {
    // builder
    //   .addCase(GetAllBookletQuestionSectionPagination.fulfilled, (state, action) => {
    //     state.BookletQuestionsSection = action.payload
    //   })

  }
})

export default correction.reducer
