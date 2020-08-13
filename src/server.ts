import * as http from 'http'

import logger from './lib/logger'
import initExpress from './lib/express'

import { config } from './config/app'
import { initWebsocket } from './services'

require('babel-core/register')
require('babel-polyfill')

const initApp = async () => {
  const port = config.get('port')

  try {
    const app = await initExpress()
    const server = http.createServer(app)

    initWebsocket(server)

    server.listen(port, () => {
      logger.info(`Server started on port ${port}:`)
    })
  } catch (error) {
    logger.error(`Error in initialising App:- ${error}`)
  }
}

initApp()
