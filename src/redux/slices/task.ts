import { faker } from '@faker-js/faker'
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

      state.metadata.isLoading = false
    },
  },
})

export const { loadTasks } = tasksSlice.actions

// export const selectAllTasks = (state: RootState) =>
//   entityTask.getSelectors().selectAll(state.tasks.tasks)

export const selectAllTasks = (state: RootState) => {
  const data: Task[] = Array.from({ length: 30 }, () => ({
    id: faker.datatype.uuid(),
    createdAt: faker.date.past().toISOString(),
    finishedAt: faker.datatype.boolean()
      ? faker.date.past().toISOString()
      : undefined,
    title: faker.lorem.sentence(),
    currentStep: faker.datatype.number({ min: 1, max: 5 }),
    endedAt: faker.date.future().toISOString(),
    name: faker.name.fullName(),
    steps: faker.datatype.number({ min: 5, max: 10 }),
  }))

  return data
}

export const selectTaskById = (id: string) => (state: RootState) =>
  entityTask.getSelectors().selectById(state.tasks.tasks, id)

export const selectTasksMetadata = (state: RootState) => state.tasks.metadata

export const selectCompletedTasks = (state: RootState) =>
  state.tasks.completedTasks

export const selectTotalTasks = (state: RootState) => state.tasks.totalTasks

export const selectUncompletedTasks = (state: RootState) =>
  state.tasks.uncompletedTasks
