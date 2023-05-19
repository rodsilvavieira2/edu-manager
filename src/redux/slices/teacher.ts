import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
  nanoid,
} from '@reduxjs/toolkit'
import { CreateParams, Teacher, UpdateParams } from '../../@types'
import { dateService } from '../../services'
import { RootState } from '../store'

const adapter = createEntityAdapter<Teacher>({
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
    isLoading: false,
  },
}

export const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    loadTeacher: (state, action: PayloadAction<Teacher[]>) => {
      adapter.setAll(state.data, action.payload)

      state.metadata.isLoading = false
    },

    addTeacher: {
      reducer: (state, action: PayloadAction<Teacher>) => {
        adapter.addOne(state.data, action.payload)
      },

      prepare: (input: CreateParams<Teacher>) => {
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

    removeTeacher: (state, action: PayloadAction<string>) => {
      adapter.removeOne(state.data, action.payload)
    },

    updateTeacher: (state, action: PayloadAction<UpdateParams<Teacher>>) => {
      adapter.updateOne(state.data, {
        id: action.payload.id,

        changes: {
          ...action.payload.changes,
          updatedAt: dateService().utc().format(),
        },
      })
    },
  },
})

export const { addTeacher, loadTeacher, removeTeacher, updateTeacher } =
  teacherSlice.actions

export const teacherSelectors = adapter.getSelectors<RootState>(
  (state) => state.teacher.data
)
