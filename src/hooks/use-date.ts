import { dateService } from '@src/services'
import { useCallback } from 'react'

export function useDate() {
  const addDays = useCallback((days: number, date?: Date | string) => {
    return dateService(date).add(days, 'days')
  }, [])

  return {
    addDays,
  }
}
