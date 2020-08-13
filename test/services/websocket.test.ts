import { WebSocket } from 'mock-socket'
import JestWebsocketMock from 'jest-websocket-mock'

jest.setTimeout(30000)

describe('#websocket', () => {
  let server: any
  let client: any
  let url: string

  beforeEach(() => {
    url = 'ws://localhost:1234'
    server = new JestWebsocketMock(url)
    client = new WebSocket(url)
  })

  afterEach(() => {
    JestWebsocketMock.clean()
  })

  it('check event at server side', async () => {
    client.onopen = () => {
      client.send('Event triggered!')
    }
    await server.connected
    await expect(server).toReceiveMessage('Event triggered!')
  })

  it('notify about the event to all the connected clients', async () => {
    const client1 = new WebSocket(url)
    await server.connected

    const client2 = new WebSocket(url)
    await server.connected

    const client3 = new WebSocket(url)
    await server.connected

    const messages = { client1: [], client2: [], client3: [] }
    client1.onmessage = (event) => {
      messages.client1.push(event.data)
    }

    client2.onmessage = (event) => {
      messages.client2.push(event.data)
    }

    client3.onmessage = (event) => {
      messages.client3.push(event.data)
    }

    server.send('Event triggered!')

    expect(messages).toEqual({
      client1: ['Event triggered!'],
      client2: ['Event triggered!'],
      client3: ['Event triggered!']
    })
  })

  it('sends errors to connected clients', async () => {
    let disconnected = false
    let error = null
    client.onclose = () => {
      disconnected = true
    }
    client.onerror = (err: any) => {
      error = err
    }

    server.send('Event triggered')
    server.error()
    expect(disconnected).toBe(true)
    expect(error.origin).toBe('ws://localhost:1234/')
    expect(error.type).toBe('error')
  })
})
