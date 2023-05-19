import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
  nanoid,
} from '@reduxjs/toolkit'
import { CreateParams, TestScore, UpdateParams } from '../../@types'
import { dateService } from '../../services'
import { RootState } from '../store'

const adapter = createEntityAdapter<TestScore>({
  selectId: (testScore) => testScore.id,

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

export const testScoreSlice = createSlice({
  name: 'testScore',
  initialState,
  reducers: {
    loadTestScore: (state, action: PayloadAction<TestScore[]>) => {
      adapter.setAll(state.data, action.payload)

      state.metadata.isLoading = false
    },

    addTestScore: {
      reducer: (state, action: PayloadAction<TestScore>) => {
        adapter.addOne(state.data, action.payload)
      },

      prepare: (input: CreateParams<TestScore>) => {
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

    updateTestScore: (
      state,
      action: PayloadAction<UpdateParams<TestScore>>
    ) => {
      const { id, ...rest } = action.payload

      adapter.updateOne(state.data, {
        id,

        changes: {
          ...rest,

          updatedAt: dateService().utc().format(),
        },
      })
    },

    removeTestScore: (state, action: PayloadAction<string>) => {
      adapter.removeOne(state.data, action.payload)
    },
  },
})

export const { loadTestScore, addTestScore, removeTestScore, updateTestScore } =
  testScoreSlice.actions

export const testScoreSelectors = adapter.getSelectors<RootState>(
  (state) => state.testScore.data
)

export const selectTestScoreMetadata = (state: RootState) => {
  return state.testScore.metadata
}
