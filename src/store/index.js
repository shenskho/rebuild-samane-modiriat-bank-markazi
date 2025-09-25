import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import common from './slices/common'
import layout from './slices/layout'
import navbar from './slices/navbar'
import auth from './slices/authentication'
import addReport from './slices/Report'
import controlPanel from './slices/controlPanel'
import Category from './slices/Category'
import License from './slices/license'

import FixData from './slices/fixData'
import variableData from './slices/variableData'
import operator from './slices/operator'
import examScope from './slices/examScope'
import examOrganizer from './slices/examOrganizer'
import scopeUser from './slices/scopeUser'
import booklet from './slices/Booklet'

const configs = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['eightStep']
}

const appReducer = combineReducers({
  common,
  layout,
  navbar,
  auth,
  addReport,
  controlPanel,
  Category,
  FixData,
  variableData,
  License,
  examScope,
  operator,
  examOrganizer,
  scopeUser,
  booklet
})

const rootReducer = (state, action) => {
  if (action.type === 'authentication/logout/fulfilled' || action.type === 'authentication/localLogout') {
    localStorage.removeItem('persist:root')
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}

export const store = configureStore({
  reducer: persistReducer(configs, rootReducer),
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false
    })
  }
})

export const persistor = persistStore(store)
