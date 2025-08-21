import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authAPI as api } from '@api'

export const SignInWithsso = createAsyncThunk('authentication/signInWithsso', async (data) => {
  const response = await api.signInWithsso(data)

  if (response.data) {
    const { hasError, result } = response.data
    if (!hasError && result) {
      logout()

      localStorage.setItem('token', result.token)
      localStorage.setItem('refreshToken', result.refreshToken)
      localStorage.setItem('tokenExpiryTime', result.expiredAt)
      localStorage.setItem('role', result.roles)
      localStorage.setItem('username', result.username)
      localStorage.setItem('firstName', result.userFullname)
      localStorage.setItem('lastName', `(${result.postTitle})`)
      localStorage.setItem('panelTypeTitle', result.panelTypeTitle)
    }
  }

  return response.data
})

const initialToken = () => {
  const token = localStorage.getItem('token')
  return token
}
const initialTokenExpiryTime = () => {
  const tokenExpiryTime = localStorage.getItem('tokenExpiryTime')
  return tokenExpiryTime
}

const initialRole = () => {
  const userData = localStorage.getItem('role')
  return userData
}
const initialFirstName = () => {
  const userData = localStorage.getItem('firstName')
  return userData
}
const initialLastName = () => {
  const userData = localStorage.getItem('lastName')
  return userData
}

const initialpanelTypeTitle = () => {
  const userData = localStorage.getItem('panelTypeTitle')
  return userData
}

const initialUserData = () => {
  const userData = localStorage.getItem('username')
  return userData ? userData : []
}
export const Extralogin = createAsyncThunk('authentication/login', async (arg) => {
  const loginResponse = await api.Login(arg)

  if (loginResponse) {
    const { hasError, result } = loginResponse.data

    if (!hasError && result) {
          localStorage.setItem('token', result.token)
    localStorage.setItem('refreshToken', result.refreshToken)
    localStorage.setItem('tokenExpiryTime', result.expiredAt)
    localStorage.setItem('role', 'result.roles')
    localStorage.setItem('username', 'result.username')
    localStorage.setItem('firstName', 'result.userFullname')
    localStorage.setItem('lastName', `(${'result.postTitle'})`)
    localStorage.setItem('panelTypeTitle', 'result.panelTypeTitle')
      // localStorage.setItem('token', result.token)
      // localStorage.setItem('refreshToken', result.refreshToken)
      // localStorage.setItem('tokenExpiryTime', result.expiredAt)
      // localStorage.setItem('role', result.roles)
      // localStorage.setItem('username', result.username)
      // localStorage.setItem('firstName', result.userFullname)
      // localStorage.setItem('lastName', `(${result.postTitle})`)

      // localStorage.setItem('panelTypeTitle', result.panelTypeTitle)
    }
  }
  return loginResponse.data
})
export const login = createAsyncThunk('authentication/login', async (loginResponse) => {
  if (loginResponse) {
    const { hasError, result } = loginResponse.data
    if (!hasError && result) {
      localStorage.setItem('token', result.token)
      localStorage.setItem('refreshToken', result.token)
      localStorage.setItem('tokenExpiryTime', result.expiredAt)
      localStorage.setItem('role', result.roles)
      localStorage.setItem('username', result.username)
      localStorage.setItem('firstName', result.userFullname)
      localStorage.setItem('lastName', `(${result.postTitle})`)

      localStorage.setItem('panelTypeTitle', result.panelTypeTitle)
    }
  }
  return loginResponse.data
})

export const logout = createAsyncThunk('authentication/logout', async () => {
  const response = await api.Logout()
  return response.data
})

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    token: initialToken(),
    tokenExpiryTime: initialTokenExpiryTime(),
    isLoggedIn: !!initialToken(),
    role: initialRole(),
    userData: initialUserData(),
    firstName: initialFirstName(),
    lastName: initialLastName(),

    panelTypeTitle: initialpanelTypeTitle(),
    signInWithsso: []
  },
  reducers: {
    localLogout: (state) => {
      state.token = null
      state.tokenExpiryTime = null
      state.isLoggedIn = false
      state.role = []
      state.userData = []
      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpiryTime')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('role')
      localStorage.removeItem('username')
      localStorage.removeItem('firstName')
      localStorage.removeItem('lastName')

      localStorage.removeItem('panelTypeTitle')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(SignInWithsso.fulfilled, (state, action) => {
        if (action.payload) {
          const data = action.payload

          if (!data.hasError) {
            state.isLoggedIn = true
            state.refreshToken = data.result.refreshToken
            state.token = data.result.token
            state.tokenExpiryTime = data.result.tokenExpiryTime
            state.role = data.result.roles
            state.userData = data.result.username
            state.firstName = data.result.userFullname
            state.lastName = `(${data.result.postTitle})`

            state.panelTypeTitle = data.result.panelTypeTitle
          }
        }
      })
      .addCase(logout.fulfilled, (state, action) => {
        const { hasError } = action.payload
        if (!hasError) {
          state.token = null
          state.tokenExpiryTime = null
          state.isLoggedIn = false
          state.role = []
          state.userData = []
          state.firstName = false
          state.lastName = []
          state.organizationalPosition = []
          localStorage.removeItem('userData')
          localStorage.removeItem('token')
          localStorage.removeItem('tokenExpiryTime')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('role')
          localStorage.removeItem('username')
          localStorage.removeItem('firstName')
          localStorage.removeItem('lastName')

          localStorage.removeItem('panelTypeTitle')
        }
      })
  }
})

export const { localLogout } = authenticationSlice.actions

export default authenticationSlice.reducer
