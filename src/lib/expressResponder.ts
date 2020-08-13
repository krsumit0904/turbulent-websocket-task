import _ from 'lodash'
import logger from './logger'

const Responder = () => {}

const sendResponse = (res: any, status: Number, body: object = null) => {
  if (!res.headersSent) {
    if (body) {
      return res.status(status).json(body)
    }

    return res.status(status).send()
  } else {
    logger.error('Response already sent.')
  }
}

Responder.success = (res: any, message: any) => {
  message = _.isString(message) ? { message } : message
  return sendResponse(res, 200, message)
}

Responder.created = (res: any, object: any) => {
  return sendResponse(res, 201, object)
}

Responder.deleted = (res: any) => {
  return sendResponse(res, 204)
}

Responder.notFound = (req: any, res: any) => {
  return sendResponse(res, 404, { reason: 'Not Found' })
}

Responder.operationFailed = (res: any, reason: any) => {
  const status = reason.status
  reason = reason.message || reason
  logger.error(reason)
  return sendResponse(res, status || 400, { reason })
}

export default Responder
