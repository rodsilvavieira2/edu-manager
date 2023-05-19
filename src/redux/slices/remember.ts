import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'
import { CreateParams, Remember, UpdateParams } from '../../@types'
import { dateService } from '../../services'
import { RootState } from '../store'

const adapter = createEntityAdapter<Remember>({
  selectId: (remember) => remember.id,

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

export const rememberSlice = createSlice({
  name: 'remember',
  initialState,
  reducers: {
    loadRemember: (state, action: PayloadAction<Remember[]>) => {
      adapter.setAll(state.data, action.payload)

      state.metadata.isLoading = false
    },

    addRemember: {
      reducer: (state, action: PayloadAction<Remember>) => {
        adapter.addOne(state.data, action.payload)
      },

      prepare: (input: CreateParams<Remember>) => {
        const date = dateService().utc().format()

        return {
          payload: {
            ...input,
            createdAt: date,
            updatedAt: date,
            id: uuid(),
          },
        }
      },
    },

    updateRemember: (state, action: PayloadAction<UpdateParams<Remember>>) => {
      adapter.updateOne(state.data, {
        id: action.payload.id,

        changes: {
          ...action.payload.changes,

          updatedAt: dateService().utc().format(),
        },
      })
    },

    removeRemember: (state, action: PayloadAction<string>) => {
      adapter.removeOne(state.data, action.payload)
    },
  },
})

export const { addRemember, loadRemember, removeRemember, updateRemember } =
  rememberSlice.actions

export const rememberSelectors = adapter.getSelectors<RootState>(
  (state) => state.remember.data
)
