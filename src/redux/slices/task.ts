import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { Task } from '../../@types'
import { RootState } from '../store'

const adapter = createEntityAdapter<Task>({
  selectId: (task) => task.id,
})

interface InitialState {
  data: ReturnType<typeof adapter.getInitialState>

  metrics: {
    completedTasks: number
    uncompletedTasks: number
    totalTasks: number
  }

  metadata: {
    isLoading: boolean
  }
}

const initialState: InitialState = {
  data: adapter.getInitialState(),

  metrics: {
    completedTasks: 0,
    totalTasks: 0,
    uncompletedTasks: 0,
  },

  metadata: {
    isLoading: true,
  },
}

export const tasksSlice = createSlice({
  initialState,
  name: 'tasks',
  reducers: {
    loadTasks(state, action: PayloadAction<Task[]>) {
      state.metrics.completedTasks = action.payload.filter(
        (task) => task.finishedAt
      ).length

      state.metrics.totalTasks = action.payload.length
      state.metrics.uncompletedTasks =
        state.metrics.totalTasks - state.metrics.completedTasks

      adapter.setAll(state.data, action.payload)

      state.metadata.isLoading = false
    },
  },
})

export const { loadTasks } = tasksSlice.actions

export const selectTasksMetadata = (state: RootState) => state.tasks.metadata

export const selectCompletedTasks = (state: RootState) =>
  state.tasks.metrics.completedTasks

export const selectTotalTasks = (state: RootState) =>
  state.tasks.metrics.totalTasks

export const selectUncompletedTasks = (state: RootState) =>
  state.tasks.metrics.uncompletedTasks

export const taskSelectors = adapter.getSelectors<RootState>(
  (state) => state.tasks.data
)
