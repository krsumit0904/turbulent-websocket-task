import _ from 'lodash'
import faker from 'faker'

import { createEvent } from '../../src/services'
import { IEventData } from '../../src/interfaces'

describe(':create', () => {
  let event: IEventData

  beforeEach(async () => {
    event = {
      name: faker.random.word(),
      timestamp: Date.now()
    }
  })

  it('should create event and return all the attributes', async () => {
    try {
      const eventResponse = await createEvent(event)
      expect(eventResponse.id).toBeDefined()
      expect(eventResponse.name).toStrictEqual(event.name)
      expect(eventResponse.timestamp).toEqual(event.timestamp.toString())
    } catch (error) {
      expect(error).toBeUndefined()
    }
  })

  it('should throw an error for required properties', async () => {
    try {
      await createEvent(_.omit(event, 'name'))
    } catch (error) {
      expect(error).toBeDefined()
      expect(error.message).toStrictEqual("Name can't be a null")
    }
  })

  it('should throw an error for timestamp format', async () => {
    try {
      event.timestamp = 'timestamp'
      await createEvent(event)
    } catch (error) {
      expect(error).toBeDefined()
      expect(error.message).toStrictEqual("Timestamp must be an integer")
    }
  })
})
