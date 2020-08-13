import Responder from '../lib/expressResponder'

import { createEvent } from '../services'
import { createEventSchema } from '../schemas'
import { validateRequestSchema } from '../decorators'

export class EventController {
  @validateRequestSchema(createEventSchema)
  async create(req: any, res: any) {
    try {
      await createEvent(req.body)
      Responder.created(res, 'Event created successfully')
    } catch (error) {
      Responder.operationFailed(res, error)
    }
  }
}
