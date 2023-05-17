import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { Class } from '../../@types'
import { RootState } from '../store'

const adapter = createEntityAdapter<Class>({
  selectId: (item) => item.id,
})

interface InitialState {
  data: ReturnType<typeof adapter.getInitialState>

  metadata: {
    isLoading: boolean
  }
}

const initialState: InitialState = {
  data: adapter.getInitialState(),

  metadata: {
    isLoading: true,
  },
}

export const classesSlice = createSlice({
  name: 'classes',

  initialState,

  reducers: {
    loadClasses: (state, action: PayloadAction<Class[]>) => {
      adapter.setAll(state.data, action.payload)

      state.metadata.isLoading = false
    },
  },
})

export const { loadClasses } = classesSlice.actions

export const selectAllClasses = (state: RootState) => {
  return adapter.getSelectors().selectAll(state.classes.data)
}
