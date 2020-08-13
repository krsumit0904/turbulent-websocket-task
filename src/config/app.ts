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
  postgres: {
    database: {
      doc: 'Database Name',
      format: String,
      default: 'turbulent_development',
      env: 'DB_NAME',
      sensitive: true,
    },
    password: {
      doc: 'Database Password',
      format: String,
      default: 'password',
      env: 'DB_PASSWORD',
      sensitive: true,
    },
    username: {
      doc: 'Database User Name',
      format: String,
      default: 'postgres',
      env: 'DB_USER',
      sensitive: true,
    },
    operatorsAliases: {
      doc: '',
      format: Boolean,
      default: false,
      env: 'DB_OPERATORS_ALIASES',
      sensitive: true,
    },
    host: {
      doc: 'Database host',
      format: String,
      default: 'postgres',
      env: 'DB_HOST',
      sensitive: true,
    },
    dialect: {
      doc: 'Database dialect',
      format: String,
      default: 'postgres',
      env: 'DB_DIALECT',
      sensitive: true,
    },
    logging: {
      doc: '',
      format: Boolean,
      default: false,
      env: 'DB_LOGGING',
      sensitive: true,
    }
  },
  cron: {
    eventTimePattern: {
      doc: 'Time pattern for event cron job',
      format: String,
      default: '* * * * * *',
      env: 'EVENT_CRON_PATTERN'
    },
  }
})

console.log('Starting service with', config.toString())

config.validate({ allowed: 'strict' })
