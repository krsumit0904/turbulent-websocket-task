import Responder from '../lib/expressResponder'

import { createEvent } from '../services'

export class EventController {
  async create(req: any, res: any) {
    try {
      await createEvent(req.body)
      Responder.created(res, 'Event created successfully')
    } catch (error) {
      Responder.operationFailed(res, error)
    }
  }
}
