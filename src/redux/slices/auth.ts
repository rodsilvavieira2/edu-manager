import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '../../@types'
import { RootState } from '../store'

interface InitialState {
  user: User | null
  provider: 'google' | 'facebook' | 'email' | null
}

const initialState: InitialState = {
  user: null,
  provider: null,
}

export const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload
    },

    setProvider(state, action: PayloadAction<InitialState['provider']>) {
      state.provider = action.payload
    },
  },
})

export const { setUser, setProvider } = authSlice.actions

export const selectUser = (state: RootState) => state.auth.user
export const selectAuthProvider = (state: RootState) => state.auth.provider
