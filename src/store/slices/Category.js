import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllCategory, createCategory, removeCategory, updateCategory } from '@api/category'

export const GetAllCategory = createAsyncThunk('category/getAllCategory', async () => {
  const response = await getAllCategory()
  return response.data?.result
})
export const CreateCategory = createAsyncThunk('category/createCategory', async (data) => {
  const response = await createCategory(data)
  return response.data?.result
})
export const RemoveCategory = createAsyncThunk('category/removeCategory', async (data) => {
  const response = await removeCategory(data)
  return response.data?.result
})
export const UpdateCategory = createAsyncThunk('category/updateCategory', async (data) => {
  const response = await updateCategory(data)
  return response.data?.result
})

export const Category = createSlice({
  name: 'Category',
  initialState: {
    categories: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllCategory.fulfilled, (state, action) => {
          state.categories = action.payload
      })

  }
})

export default Category.reducer
