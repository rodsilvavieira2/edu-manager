export type User = {
  id: string
  name: string
  email: string
  profile_url: string
  created_at: string
  updated_at: string
}

export type Task = {
  id: string
  name: string
  steps: number

  currentStep: number
  finishedAt: string
  createdAt: string
  endedAt: string
}

export type Discipline = {
  id: string

  name: string
  roomName: string
  color?: string

  idProfessor?: string
  idPeriod?: string
  description?: string

  createdAt: string
  updatedAt: string
}

export type Teacher = {
  id: string

  name: string
  phones: string[]
  email: string[]

  createdAt: string
  updatedAt: string
}

export type TestScoreType = 'oral' | 'written' | 'practical' | 'multiple_choice'

export type TestScore = {
  id: string
  value: string
  date: string
  idDiscipline: string
  shouldNotify: boolean
  type: string

  description?: string

  createdAt: string
  updatedAt: string
}

export type Homework = {
  id: string
  name: string
  date: string

  tasks: Task[]

  shouldNotify: boolean
  idDiscipline: string

  description?: string

  createdAt: string
  updatedAt: string
}

export type Remember = {
  id: string
  name: string
  date: string

  tasks: Task[]
  shouldNotify: boolean
  color: string

  description?: string

  createdAt: string
  updatedAt: string
}
