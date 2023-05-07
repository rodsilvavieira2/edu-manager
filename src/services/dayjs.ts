import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utf from 'dayjs/plugin/utc'

dayjs.extend(utf)
dayjs.extend(timezone)

export const dateService = dayjs
