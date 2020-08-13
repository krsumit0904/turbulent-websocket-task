import { CronJob } from 'cron'

import logger from '../lib/logger'

import { config } from '../config/app'
import { IEventData } from '../interfaces'
import { triggerEvent, getCurrentEvents } from '../services'

const eventTimePattern = config.get('cron.eventTimePattern')
export const eventCron = new CronJob(eventTimePattern, async () => {
  try {
    const events = await getCurrentEvents()
    events.forEach((event: IEventData) => {
      triggerEvent(event.name)
      logger.info(`Event triggered for timestamp: ${event.timestamp}`)
    })
  } catch (error) {
    logger.error(error)
  }
})
