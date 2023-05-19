export type CreateParams<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>

export type UpdateParams<T> = {
  changes: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>
  id: string
}
