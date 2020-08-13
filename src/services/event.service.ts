import models from '../models'
import logger from '../lib/logger'
import { IEventData } from '../interfaces'

export const createEvent = async (data: IEventData) => {
  try {
    const event = await models.events.create(data)

    logger.info(`Event saved successfully: ${data.name}`)
    return event
  } catch (error) {
    throw new Error(error.errors[0].message)
  }
}

export const getCurrentEvents = async () => {
  const timestamp = Math.round(Date.now() / 1000)
  try {
    const events = await models.events.findAll({ where: { timestamp } })
    return events
  } catch (error) {
    logger.error(error)
    throw new Error(`Error in feching events: ${timestamp}`)
  }
}
