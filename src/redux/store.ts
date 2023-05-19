import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/base'
import {
  authSlice,
  disciplineSlice,
  homeworkSlice,
  snackbarSlice,
  tasksSlice,
  teacherSlice,
  testScoreSlice,
} from './slices'
import { rememberSlice } from './slices/remember'

export const store = configureStore({
  reducer: {
    // slices
    [authSlice.name]: authSlice.reducer,
    [tasksSlice.name]: tasksSlice.reducer,
    [snackbarSlice.name]: snackbarSlice.reducer,
    [disciplineSlice.name]: disciplineSlice.reducer,
    [teacherSlice.name]: teacherSlice.reducer,
    [homeworkSlice.name]: homeworkSlice.reducer,
    [testScoreSlice.name]: testScoreSlice.reducer,
    [rememberSlice.name]: rememberSlice.reducer,

    // api
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
