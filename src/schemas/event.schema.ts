export const createEventSchema = {
  properties: {
    name: { type: 'string', minlength: 3, maxlength: 20 },
    timestamp: { type: 'number' }
  },
  required: ['name', 'timestamp'],
  additionalProperties: false
}
