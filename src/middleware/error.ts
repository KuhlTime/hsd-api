import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import env from '@env'
import log from '@log'
import APIError from '@/models/APIError'

/**
 * A express middleware to handle an JavaScript error
 * and converts it into an APIError
 */
export const converter = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  let error = err
  const isAPIError = error instanceof APIError

  // When the error is not already an APIError convert it
  // to an APIError
  if (!isAPIError) {
    const statusCode = httpStatus.INTERNAL_SERVER_ERROR
    const message = error.message || httpStatus[statusCode].toString()

    error = new APIError(statusCode, message, err.stack)
  }

  next(error)
}

/**
 * Send the actual APIError to the client
 */
export const handler = (err: APIError, req: Request, res: Response): void => {
  log.error(err.message)

  res.status(err.statusCode).send({
    code: err.statusCode,
    message: err.message,
    stack: env.nodeEnv === 'development' ? err.stack : undefined
  })
}
