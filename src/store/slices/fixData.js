import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { fixData as apis } from '@api'
/////////////////////DutyStatus/////////////////////
export const GetDutystatus = createAsyncThunk('fixData/getDutystatus', async () => {
  const response = await apis.getDutystatus()
  return response.data.result
})
export const CreateDutystatus = createAsyncThunk('fixData/createDutystatus', async (param) => {
  const response = await apis.createDutystatus(param)
  return response.data.result
})
export const removeDutystatus = createAsyncThunk('fixData/deleteDutystatus', async (param) => {
  const response = await apis.removeDutystatus(param)
  return response.data.result
})
export const updateDutystatus = createAsyncThunk('fixData/updateDutystatus', async (param) => {
  const response = await apis.updateDutystatus(param)
  return response.data.result
})
/////////////////////Organizations/////////////////////
export const getOrganizations = createAsyncThunk('fixData/getOrganizations', async () => {
  const response = await apis.getOrganizations()
  return response.data.result
})
export const createOrganizations = createAsyncThunk('fixData/createOrganizations', async (param) => {
  const response = await apis.createOrganizations(param)
  return response.data.result
})
export const removeOrganizations = createAsyncThunk('fixData/removeOrganizations', async (param) => {
  const response = await apis.removeOrganizations(param)
  return response.data.result
})
export const updateOrganizations = createAsyncThunk('fixData/updateOrganizations', async (param) => {
  const response = await apis.updateOrganizations(param)
  return response.data.result
})
/////////////////////Province/////////////////////
export const getProvince = createAsyncThunk('fixData/getProvince', async () => {
  const response = await apis.getProvince()
  return response.data.result
})
export const createProvince = createAsyncThunk('fixData/createProvince', async (param) => {
  const response = await apis.createProvince(param)
  return response.data.result
})
export const removeProvince = createAsyncThunk('fixData/removeProvince', async (param) => {
  const response = await apis.removeProvince(param)
  return response.data.result
})
export const updateProvince = createAsyncThunk('fixData/updateProvince', async (param) => {
  const response = await apis.updateProvince(param)
  return response.data.result
})
/////////////////EducationLevel///////////////
export const GetEducationLevel = createAsyncThunk('fixData/getEducationLevel', async () => {
  const response = await apis.getEducationLevel()
  return response.data.result
})
export const CreateEducationLevel = createAsyncThunk('fixData/CreateEducationLevel', async (param) => {
  const response = await apis.createEducationLevel(param)
  return response.data.result
})
export const removeEducationLevel = createAsyncThunk('fixData/deleteEducationLevel', async (param) => {
  const response = await apis.removeEducationLevel(param)
  return response.data.result
})
export const updateEducationLevel = createAsyncThunk('fixData/updateEducationLevel', async (param) => {
  const response = await apis.updateEducationLevel(param)
  return response.data.result
})

/////////////////EducationFils///////////////
export const GetEducationField = createAsyncThunk('fixData/getEducationField', async (param) => {
  const response = await apis.getEducationField(param)
  return response.data.result
})
export const CreateEducationField = createAsyncThunk('fixData/createEducationField', async (param) => {
  const response = await apis.createEducationField(param)
  return response.data.result
})
export const RemoveEducationField = createAsyncThunk('fixData/removeEducationField', async (param) => {
  const response = await apis.removeEducationField(param)
  return response.data.result
})
export const UpdateEducationField = createAsyncThunk('fixData/updateEducationField', async (param) => {
  const response = await apis.updateEducationField(param)
  return response.data.result
})

//////////////Quota/////////////////
export const GetQuota = createAsyncThunk('fixData/getQuota', async () => {
  const response = await apis.getQuota()
  return response.data.result
})
export const CreateQuota = createAsyncThunk('fixData/CreateQuota', async (param) => {
  const response = await apis.createQuota(param)
  return response.data.result
})
export const removeQuota = createAsyncThunk('fixData/deleteQuota', async (param) => {
  const response = await apis.removeQuota(param)
  return response.data.result
})
export const updateQuota = createAsyncThunk('fixData/updateQuota', async (param) => {
  const response = await apis.updateQuota(param)
  return response.data.result
})
////////////////////Religion//////////////////
export const GetReligion = createAsyncThunk('fixData/getReligion', async () => {
  const response = await apis.getReligion()
  return response.data.result
})
export const CreateReligion = createAsyncThunk('fixData/CreateReligion', async (param) => {
  const response = await apis.createReligion(param)
  return response.data.result
})
export const removeReligion = createAsyncThunk('fixData/deleteReligion', async (param) => {
  const response = await apis.removeReligion(param)
  return response.data.result
})
export const updateReligion = createAsyncThunk('fixData/updateReligion', async (param) => {
  const response = await apis.updateReligion(param)
  return response.data.result
})
//////////////////EmploymentType/////////////////
export const GetEmploymentType = createAsyncThunk('fixData/getEmploymentType', async () => {
  const response = await apis.getEmploymentType()
  return response.data.result
})
export const CreateEmploymentType = createAsyncThunk('fixData/CreateEmploymentType', async (param) => {
  const response = await apis.createEmploymentType(param)
  return response.data.result
})
export const removeEmploymentType = createAsyncThunk('fixData/deleteEmploymentType', async (param) => {
  const response = await apis.removeEmploymentType(param)
  return response.data.result
})
export const updateEmploymentType = createAsyncThunk('fixData/updateEmploymentType', async (param) => {
  const response = await apis.updateEmploymentType(param)
  return response.data.result
})
////////////////UniversityType////////////
export const GetUniversityType = createAsyncThunk('fixData/getUniversityType', async () => {
  const response = await apis.getUniversityType()
  return response.data.result
})
export const CreateUniversityType = createAsyncThunk('fixData/CreateUniversityType', async (param) => {
  const response = await apis.createUniversityType(param)
  return response.data.result
})
export const removeUniversityType = createAsyncThunk('fixData/deleteUniversityType', async (param) => {
  const response = await apis.removeUniversityType(param)
  return response.data.result
})
export const updateUniversityType = createAsyncThunk('fixData/updateUniversityType', async (param) => {
  const response = await apis.updateUniversityType(param)
  return response.data.result
})
/////////////////////City//////////////////////
export const GetCity = createAsyncThunk('fixData/getCity', async () => {
  const response = await apis.getCity()
  return response.data.result
})
export const CreateCity = createAsyncThunk('fixData/CreateCity', async (param) => {
  const response = await apis.createCity(param)
  return response.data.result
})
export const removeCity = createAsyncThunk('fixData/deleteCity', async (param) => {
  const response = await apis.removeCity(param)
  return response.data.result
})
export const updateCity = createAsyncThunk('fixData/updateCity', async (param) => {
  const response = await apis.updateCity(param)
  return response.data.result
})
///////////////////ActivityScope/////////////
export const GetActivityScope = createAsyncThunk('fixData/getActivityScope', async () => {
  const response = await apis.getActivityScope()
  return response.data.result
})
export const CreateActivityScope = createAsyncThunk('fixData/CreateActivityScope', async (param) => {
  const response = await apis.createActivityScope(param)
  return response.data.result
})
export const removeActivityScope = createAsyncThunk('fixData/deleteActivityScope', async (param) => {
  const response = await apis.removeActivityScope(param)
  return response.data.result
})
export const updateActivityScope = createAsyncThunk('fixData/updateActivityScope', async (param) => {
  const response = await apis.updateActivityScope(param)
  return response.data.result
})
///////////////Veteran//////////////
export const GetVeteran = createAsyncThunk('fixData/getVeteran', async () => {
  const response = await apis.getVeteran()
  return response.data.result
})
export const CreateVeteran = createAsyncThunk('fixData/CreateVeteran', async (param) => {
  const response = await apis.createVeteran(param)
  return response.data.result
})
export const removeVeteran = createAsyncThunk('fixData/deleteVeteran', async (param) => {
  const response = await apis.removeVeteran(param)
  return response.data.result
})
export const updateVeteran = createAsyncThunk('fixData/updateVeteran', async (param) => {
  const response = await apis.updateVeteran(param)
  return response.data.result
})

export const addReport = createSlice({
  name: 'fixData',
  initialState: {
    dutyStatus: [],
    organizations: [],
    Province: [],
    EducationLevel: [],
    EducationField: [],
    Quota: [],
    Religion: [],
    EmploymentType: [],
    UniversityType: [],
    City: [],
    ActivityScope: [],
    Veteran: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetVeteran.fulfilled, (state, action) => {
      state.Veteran = action.payload
    })
    builder.addCase(GetActivityScope.fulfilled, (state, action) => {
      state.ActivityScope = action.payload
    })
    builder.addCase(GetCity.fulfilled, (state, action) => {
      state.City = action.payload
    })
    builder.addCase(GetDutystatus.fulfilled, (state, action) => {
      state.dutyStatus = action.payload
    })
    builder.addCase(getOrganizations.fulfilled, (state, action) => {
      state.organizations = action.payload
    })
    builder.addCase(getProvince.fulfilled, (state, action) => {
      state.Province = action.payload
    })
    builder.addCase(GetEducationLevel.fulfilled, (state, action) => {
      state.EducationLevel = action.payload
    })
    builder.addCase(GetQuota.fulfilled, (state, action) => {
      state.Quota = action.payload
    })
    builder.addCase(GetReligion.fulfilled, (state, action) => {
      state.Religion = action.payload
    })
    builder.addCase(GetEmploymentType.fulfilled, (state, action) => {
      state.EmploymentType = action.payload
    })
    builder.addCase(GetUniversityType.fulfilled, (state, action) => {
      state.UniversityType = action.payload
    })
    builder.addCase(GetEducationField.fulfilled, (state, action) => {
      state.EducationField = action.payload
    })
  }
})

export default addReport.reducer
