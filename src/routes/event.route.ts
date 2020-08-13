import express from 'express'

import { EventController } from '../controllers'

export const initEventRoutes = () => {
  const eventRouter = express.Router()
  const eventController = new EventController()

  eventRouter.post('/', eventController.create)

  return eventRouter
}
