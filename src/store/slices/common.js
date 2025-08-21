import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authAPI as api } from '@api'

//راهنما
export const getAllSystemGuides = createAsyncThunk('garnt/getAllSystemGuides', async () => {
  const response = await api.getAllSystemGuides()
  return response.data
})

const isPendingAction = (action) => {
  return action.type.endsWith('/pending')
}
const isFulfilledAction = (action) => {
  return action.type.endsWith('/fulfilled')
}
const isRejectedAction = (action) => {
  return action.type.endsWith('/rejected')
}

const initialSystemGuides = () => {
  const systemGuides = localStorage.getItem('systemGuides')
  return systemGuides ? JSON.parse(systemGuides) : []
}

export const commonSlice = createSlice({
  name: 'common',
  initialState: {
    loading: 'idle',
    // currentRequestId: null

    systemGuides: initialSystemGuides()
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSystemGuides.fulfilled, (state, action) => {
        if (action.payload) {
          const { hasError, result } = action.payload
          if (!hasError) {
            state.systemGuides = result
            localStorage.setItem('systemGuides', JSON.stringify(result))
          }
        }
      })

      .addMatcher(isPendingAction, (state) => {
        // const { requestId } = action.meta
        if (state.loading === 'idle') {
          state.loading = 'pending'
          // state.currentRequestId = requestId
        }
      })
      .addMatcher(isFulfilledAction, (state) => {
        // const { requestId } = action.meta
        if (
          state.loading === 'pending'
          // && state.currentRequestId === requestId
        ) {
          state.loading = 'idle'
          // state.currentRequestId = null
        }
      })
      .addMatcher(isRejectedAction, (state) => {
        // const { requestId } = action.meta
        if (
          state.loading === 'pending'
          // && state.currentRequestId === requestId
        ) {
          state.loading = 'idle'
          // state.currentRequestId = null
        }
      })
  }
})

export default commonSlice.reducer
