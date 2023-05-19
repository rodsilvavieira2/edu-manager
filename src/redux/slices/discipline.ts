import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
  nanoid,
} from '@reduxjs/toolkit'
import { CreateParams, Discipline } from '../../@types'
import { dateService } from '../../services'
import { RootState } from '../store'

const adapter = createEntityAdapter<Discipline>({
  selectId: (item) => item.id,

  sortComparer: (a, b) => {
    const createdAtA = dateService(a.createdAt).utc().unix()

    const createdAtB = dateService(b.createdAt).utc().unix()

    if (createdAtA > createdAtB) return -1

    if (createdAtA < createdAtB) return 1

    return 0
  },
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

export const disciplineSlice = createSlice({
  name: 'discipline',

  initialState,

  reducers: {
    loadDiscipline: (state, action: PayloadAction<Discipline[]>) => {
      adapter.setAll(state.data, action.payload)

      state.metadata.isLoading = false
    },

    addDiscipline: {
      reducer: (state, action: PayloadAction<Discipline>) => {
        adapter.addOne(state.data, action.payload)
      },

      prepare: (input: CreateParams<Discipline>) => {
        const date = dateService().utc().format()

        return {
          payload: {
            ...input,
            id: nanoid(),
            createdAt: date,
            updatedAt: date,
          },
        }
      },
    },

    removeDiscipline: (state, action: PayloadAction<string>) => {
      adapter.removeOne(state.data, action.payload)
    },
  },
})

export const { loadDiscipline } = disciplineSlice.actions

export const disciplineSelectors = adapter.getSelectors<RootState>(
  (state) => state.discipline.data
)
