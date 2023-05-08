import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '../../@types'
import { RootState } from '../store'

interface InitialState {
  user: User | null
}

const initialState: InitialState = {
  user: null,
}

export const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload
    },
  },
})

export const { setUser } = authSlice.actions

export const selectUser = (state: RootState) => state.auth.user
