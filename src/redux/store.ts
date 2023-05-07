import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/base'
import { authSlice, snackbarSlice } from './slices'

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [snackbarSlice.name]: snackbarSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
