import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
  nanoid,
} from '@reduxjs/toolkit'
import { RootState } from '../store'

type Item = {
  id: string
  message: string
  status: 'success' | 'info' | 'warning' | 'error'
  duration?: number
}

const snackAdapter = createEntityAdapter<Item>({
  selectId: (item) => item.id,
})

interface InitialState {
  snacks: ReturnType<typeof snackAdapter.getInitialState>
}

const initialState: InitialState = {
  snacks: snackAdapter.getInitialState(),
}

type OpenSnackbarPayload = Omit<Item, 'id'>

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    addSnackbar: (state, action: PayloadAction<OpenSnackbarPayload>) => {
      snackAdapter.addOne(state.snacks, {
        id: nanoid(),
        message: action.payload.message,
        status: action.payload.status,
        duration: action.payload.duration,
      })
    },

    closeSnackbar: (state, action: PayloadAction<string>) => {
      snackAdapter.removeOne(state.snacks, action.payload)
    },
  },
})

export const { addSnackbar, closeSnackbar } = snackbarSlice.actions

export const selectSnackbar = (state: RootState) =>
  snackAdapter.getSelectors().selectAll(state.snackbar.snacks)
