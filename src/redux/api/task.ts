import { baseApi } from './base'

export const taskApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({}),
})
