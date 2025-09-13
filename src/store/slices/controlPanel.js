import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  readUsers,
  readTypes,
  setUserPanelType,
  createRole,
  readRoles,
  updateRole,
  deleteRole,
  setReportPermissionsToRole,
  getReportPermissionsOfRole,
  addRoleToUser,
  readUserRole,
  getReportPermissionsToCategory,
  setReportPermissionsToCategory,
  getAllCategory,
  createUser
} from '@api/controlPanel'

import { signUp } from '@api/auth'
import { getAllReports } from '@api/report'
export const SignUp = createAsyncThunk('controlPanel/SignUp', async (data) => {
  const response = await signUp(data)
  return response.data
})

export const ReadUsers = createAsyncThunk('controlPanel/readUsers', async () => {
  const response = await readUsers()

  return response.data.result
})
export const CreateUser = createAsyncThunk('controlPanel/createUser', async (param) => {
  const response = await createUser(param)

  return response.data.result
})

export const ReadTypes = createAsyncThunk('controlPanel/readTypes', async () => {
  const response = await readTypes()
  return response.data.result
})

export const SetUserPanelType = createAsyncThunk('controlPanel/setUserPanelType', async (data) => {
  const response = await setUserPanelType(data)
  return response.data.result
})
export const AddRoleToUser = createAsyncThunk('controlPanel/addRoleToUser', async (data) => {
  const response = await addRoleToUser(data)
  return response.data.result
})

export const ReadUserRole = createAsyncThunk('controlPanel/readUserRole', async (data) => {
  const response = await readUserRole(data)
  return response.data.result
})

///////////////////////////////////////////

export const CreateRole = createAsyncThunk('controlPanel/createRole', async (data) => {
  const response = await createRole(data)
  return response.data.result
})

export const ReadRoles = createAsyncThunk('controlPanel/readRoles', async () => {
  const response = await readRoles()
  return response.data.result
})
export const UpdateRole = createAsyncThunk('controlPanel/updateRole', async (data) => {
  const response = await updateRole(data)
  return response.data.result
})
export const DeleteRole = createAsyncThunk('controlPanel/deleteRole', async (data) => {
  const response = await deleteRole(data)
  return response.data.result
})

export const GetReportPermissionsOfRole = createAsyncThunk('controlPanel/getReportPermissionsOfRole', async (data) => {
  const response = await getReportPermissionsOfRole(data)
  return response.data.result
})

export const SetReportPermissionsToRole = createAsyncThunk('controlPanel/setReportPermissionsToRole', async (data) => {
  const response = await setReportPermissionsToRole(data)
  return response.data.result
})

export const GetAllReports = createAsyncThunk('controlPanel/getAllReports', async (data) => {
  const response = await getAllReports(data)
  return response.data.result
})
export const GetReportPermissionsToCategory = createAsyncThunk(
  'controlPanel/getReportPermissionsToCategory',
  async (data) => {
    const response = await getReportPermissionsToCategory(data)

    return response.data.result
  }
)
export const SetReportPermissionsToCategory = createAsyncThunk(
  'controlPanel/setReportPermissionsToCategory',
  async (data) => {
    const response = await setReportPermissionsToCategory(data)
    return response.data.result
  }
)

export const GetAllCategory = createAsyncThunk('controlPanel/getAllCategory', async () => {
  const response = await getAllCategory()
  return response.data?.result
})

export const controlPanel = createSlice({
  name: 'controlPanel',
  initialState: {
    userList: [],
    Types: [],
    Roles: [],
    RoleReports: [],
    Reports: [],
    userRoles: [],
    userCategorys: [],
    categorys: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ReadUsers.fulfilled, (state, action) => {
        state.userList = action.payload
      })
      .addCase(ReadTypes.fulfilled, (state, action) => {
        state.Types = action.payload
      })

      .addCase(ReadRoles.fulfilled, (state, action) => {
        state.Roles = action.payload
      })
      .addCase(GetReportPermissionsOfRole.fulfilled, (state, action) => {
        state.RoleReports = action.payload
      })
      .addCase(GetAllReports.fulfilled, (state, action) => {
        state.Reports = action.payload
      })
      .addCase(ReadUserRole.fulfilled, (state, action) => {
        state.userRoles = action.payload
      })
      .addCase(GetReportPermissionsToCategory.fulfilled, (state, action) => {
        state.userCategorys = action.payload
      })
      .addCase(GetAllCategory.fulfilled, (state, action) => {
        state.categorys = action.payload
      })
  }
})

export default controlPanel.reducer
