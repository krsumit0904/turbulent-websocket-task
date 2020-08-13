import { eventCron } from './triggerEvent'

export const initCronJobs = () => {
  eventCron.start()
}
