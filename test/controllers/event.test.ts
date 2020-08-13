import _ from 'lodash'
import faker from 'faker'
import EventEmitter from 'events'
import httpMocks from 'node-mocks-http'

import { IEventData } from '../../src/interfaces'
import { EventController } from '../../src/controllers'

describe(':create', () => {
  let event: IEventData
  let eventController: any

  beforeAll(async () => {
    eventController = new EventController()
  })

  beforeEach(async () => {
    event = {
      name: faker.random.word(),
      timestamp: Date.now()
    }
  })

  it('should have create method defined', () => {
    expect(eventController.create).toBeDefined()
  })

  it('should have create event with correct input', async (done) => {
    const { req, res } = httpMocks.createMocks({
      method: 'POST',
      url: '/events',
      body: event,
    }, { eventEmitter: EventEmitter })

    res.on('end', () => {
      const statusCode = res._getStatusCode()
      expect(statusCode).toStrictEqual(201)
      done()
    })

    await eventController.create(req, res)
  })
})
