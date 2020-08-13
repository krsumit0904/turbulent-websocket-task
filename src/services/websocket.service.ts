import WebSocket from 'ws'
import { config } from '../config/app'
import { ExtWebSocket } from '../interfaces'

const url = `ws://${config.get('app.name')}:${config.get('port')}`

let wss: any

export const initWebsocket = (server: any) => {
  wss = new WebSocket.Server({ server })
  wss.on('connection', (ws: ExtWebSocket) => {
    ws.isAlive = true

    ws.on('pong', () => {
      ws.isAlive = true
    })

    ws.on('message', (message: string) => {
      try {
        broadcast(message)
      } catch (error) {
        console.log(`Something went wrong: ${error.message}`)
      }
    })

    ws.send('WebSocket server exposed')
  })

  handleClients()
}

const handleClients = () => {
  setInterval(() => {
    wss.clients.forEach((ws: ExtWebSocket) => {
      if (!ws.isAlive) return ws.terminate()

      ws.isAlive = false
      ws.ping(null, false)
    })
  }, 10000)
}

const broadcast = (message: string) => {
  wss.clients
    .forEach((client: any) => {
      client.send(message)
    })
}
