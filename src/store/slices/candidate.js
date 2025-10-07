import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { candidate as apis } from '@api'
/////////////////////Booklet/////////////////////

export const GetAllCandidate = createAsyncThunk('Candidate/getAllCandidate', async (param) => {
  const response = await apis.getAllCandidate(param)

  return response.data.result
})

export const UploadAnswerCandidate = createAsyncThunk('Candidate/uploadAnswerCandidate', async (param) => {
  const response = await apis.uploadAnswerCandidate(param, 1)
  return response.data.result
})

export const GetAnswareCandidateStatus = createAsyncThunk('Candidate/getAnswareCandidateStatus', async (param) => {
  const response = await apis.getAnswareCandidateStatus(param)
  return response.data.result
})

export const ProcessAnswerCandidate = createAsyncThunk('Candidate/processAnswerCandidate', async (param) => {
  const response = await apis.processAnswerCandidate(param)
  return response.data.result
})

export const ProcessAnswerCandidateStatus = createAsyncThunk(
  'Candidate/processAnswerCandidateStatus',
  async (param) => {
    const response = await apis.processAnswerCandidateStatus(param)
    return response.data.result
  }
)

export const GetUserExcel = createAsyncThunk('Candidate/getUserExcel', async (param) => {
  const response = await apis.getUserExcel(param)
  return response.data
})

export const ProcessFinalResultStart = createAsyncThunk('Candidate/processFinalResultStart', async () => {
  const response = await apis.processFinalResultStart()
  return response.data.result
})

export const ProcessFinalResultStartStatus = createAsyncThunk(
  'Candidate/processFinalResultStartStatus',
  async (param) => {
    const response = await apis.processFinalResultStartStatus(param)
    return response.data.result
  }
)
export const DownloadCandidateAnsware = createAsyncThunk('Candidate/downloadCandidateAnsware', async (param) => {
  const response = await apis.downloadCandidateAnsware(param)
  return response.data
})

export const GetAlExel = createAsyncThunk('Candidate/getAlExel', async () => {
  const response = await apis.getAlExel()
  return response.data
})

/////////////////////candidateQuestion//////////

export const GetAllBookletQuestionSectionPagination = createAsyncThunk(
  'Booklet/getAllBookletQuestionSectionPagination',
  async (param) => {
    const response = await apis.getAllBookletQuestionSectionPagination(param)
    console.log(response)
    return response.data.result
  }
)

export const CreateBookletQuestionSection = createAsyncThunk('Booklet/createBookletQuestionSection', async (param) => {
  const response = await apis.createBookletQuestionSection(param)
  return response.data.result
})

export const candidate = createSlice({
  name: 'candidate',
  initialState: {
    BookletsCadidate: [],
    BookletQuestionsSection: [],
    AnswareCadidateStatus: [],
    ProcessFinalResultStartStatus: []
  },
 reducers: {
  clearBookletsCadidate: (state) => {
    state.BookletsCadidate = { items: [], totalCount: 0 }
  }
},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllBookletQuestionSectionPagination.fulfilled, (state, action) => {
        state.BookletQuestionsSection = action.payload
      })
      .addCase(GetAnswareCandidateStatus.rejected, (state, action) => {
        state.AnswareCadidateStatus = action.payload
      })
      .addCase(GetAllCandidate.fulfilled, (state, action) => {
        state.BookletsCadidate = action.payload
      })

      .addCase(ProcessFinalResultStartStatus.fulfilled, (state, action) => {
        state.ProcessFinalResultStartStatus = action.payload
      })
  }
})

export default candidate.reducer
