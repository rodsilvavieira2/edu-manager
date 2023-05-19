import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
  nanoid,
} from '@reduxjs/toolkit'
import { CreateParams, Homework, UpdateParams } from '../../@types'
import { dateService } from '../../services'
import { RootState } from '../store'

export const adapter = createEntityAdapter<Homework>({
  selectId: (homework) => homework.id,

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
    isLoading: false,
  },
}

export const homeworkSlice = createSlice({
  name: 'homework',
  initialState,
  reducers: {
    loadHomework: (state, action: PayloadAction<Homework[]>) => {
      adapter.setAll(state.data, action.payload)

      state.metadata.isLoading = false
    },

    addHomework: {
      reducer: (state, action: PayloadAction<Homework>) => {
        adapter.addOne(state.data, action.payload)
      },

      prepare: (input: CreateParams<Homework>) => {
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

    updateHomework: (state, action: PayloadAction<UpdateParams<Homework>>) => {
      adapter.updateOne(state.data, {
        id: action.payload.id,

        changes: {
          ...action.payload.changes,

          updatedAt: dateService().utc().format(),
        },
      })
    },

    removeHomework: (state, action: PayloadAction<string>) => {
      adapter.removeOne(state.data, action.payload)
    },
  },
})

export const { addHomework, loadHomework, removeHomework, updateHomework } =
  homeworkSlice.actions

export const homeworkSelectors = adapter.getSelectors<RootState>(
  (state) => state.homework.data
)

export const selectHomeworkMetadata = (state: RootState) => {
  return state.homework.metadata
}
