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
