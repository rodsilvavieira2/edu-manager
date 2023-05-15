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

export type Class = {
  id: string

  name: string
  teacher: string

  description?: string

  createdAt: string
  updatedAt: string
}
