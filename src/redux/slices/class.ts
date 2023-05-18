import { faker } from '@faker-js/faker'
import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { Discipline } from '../../@types'
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

export const classesSlice = createSlice({
  name: 'classes',

  initialState,

  reducers: {
    loadClasses: (state, action: PayloadAction<Discipline[]>) => {
      adapter.setAll(state.data, action.payload)

      state.metadata.isLoading = false
    },
  },
})

export const { loadClasses } = classesSlice.actions

export const selectAllClasses = (state: RootState) => {
  return Array.from(
    {
      length: 30,
    },
    () => ({
      id: faker.datatype.uuid(),
      name: faker.lorem.word(),
      teacher: faker.name.fullName(),
      description: faker.lorem.paragraph(),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    })
  )
}

export const selectMetadataClass = (state: RootState) => {
  return state.classes.metadata
}
