import { configureStore } from '@reduxjs/toolkit'
import { taskApi } from './api'
import { baseApi } from './api/base'
import { authSlice, snackbarSlice, tasksSlice } from './slices'

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [tasksSlice.name]: tasksSlice.reducer,
    [snackbarSlice.name]: snackbarSlice.reducer,

    [baseApi.reducerPath]: baseApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
