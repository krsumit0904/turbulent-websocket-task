import cors from 'cors'
import express from 'express'
import * as bodyParser from 'body-parser'
import methodOverride from 'method-override'

import Responder from './expressResponder'
import { initRoutes } from './../routes'

const app = express()

const initMiddleware = () => {
  app.use(methodOverride())

  app.use(cors())

  app.use(bodyParser.json({ limit: '50mb' }))
}

const initPingURL = () => {
  app.get('/_ping', (req, res) => {
    Responder.success(res, { result: 'Ping Received!!!' })
  })
}

const catchNotFound = () => {
  app.use(Responder.notFound)
}

const catchErrorRoutes = () => {
  app.use((err: any, req: any, res: any, next: any) => {
    if (!err) return next()
    return Responder.operationFailed(res, err)
  })
}

const initExpress = () => {
  initMiddleware()

  initPingURL()

  initRoutes(app)

  catchNotFound()

  catchErrorRoutes()

  return app
}

export default initExpress
