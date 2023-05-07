import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '../../@types'

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
