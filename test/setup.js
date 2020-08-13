require('ts-node/register')
const models = require('../src/models')

beforeAll(async () => {
  await models.sequelize.sync()
})
