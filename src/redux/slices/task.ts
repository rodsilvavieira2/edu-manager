import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { Task } from '../../@types'
import { RootState } from '../store'

const entityTask = createEntityAdapter<Task>({
  selectId: (task) => task.id,
})

interface InitialState {
  tasks: ReturnType<typeof entityTask.getInitialState>
  completedTasks: number
  uncompletedTasks: number
  totalTasks: number

  metadata: {
    isLoading: boolean
  }
}

const initialState: InitialState = {
  tasks: entityTask.getInitialState(),
  completedTasks: 0,
  totalTasks: 0,
  uncompletedTasks: 0,

  metadata: {
    isLoading: true,
  },
}

export const tasksSlice = createSlice({
  initialState,
  name: 'tasks',
  reducers: {
    loadTasks(state, action: PayloadAction<Task[]>) {
      state.completedTasks = action.payload.filter(
        (task) => task.finishedAt
      ).length

      state.totalTasks = action.payload.length
      state.uncompletedTasks = state.totalTasks - state.completedTasks

      entityTask.setAll(state.tasks, action.payload)
    },
  },
})

export const { loadTasks } = tasksSlice.actions

export const selectAllTasks = (state: RootState) =>
  entityTask.getSelectors().selectAll(state.tasks.tasks)

export const selectTaskById = (id: string) => (state: RootState) =>
  entityTask.getSelectors().selectById(state.tasks.tasks, id)

export const selectTasksMetadata = (state: RootState) => state.tasks.metadata

export const selectCompletedTasks = (state: RootState) =>
  state.tasks.completedTasks

export const selectTotalTasks = (state: RootState) => state.tasks.totalTasks

export const selectUncompletedTasks = (state: RootState) =>
  state.tasks.uncompletedTasks
