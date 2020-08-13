import Ajv from 'ajv'

const ajv = new Ajv()

export const validateRequestSchema = (validationSchema: object) => (
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value

  descriptor.value = function (...args) {
    const { body } = args[0]
    const valid = ajv.validate(validationSchema, body)
    if (!valid) throw new Error(`Invalid query: ${ajv.errorsText(ajv.errors)}`)

    return originalMethod.apply(this, args)
  }

  return descriptor
}
