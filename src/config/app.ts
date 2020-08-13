const convict = require('convict')

export const config = convict({
  app: {
    name: {
      doc: 'Name of the service',
      format: String,
      default: 'websocket'
    }
  },
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT'
  },
})

console.log('Starting service with', config.toString())

config.validate({ allowed: 'strict' })
