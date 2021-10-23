/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import env from '@env'
import log from '@log'
import APIError from '@/models/APIError'

/**
 * A express middleware to handle an JavaScript error
 * and converts it into an APIError
 */
const converter = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  let error = err
  const isAPIError = error instanceof APIError

  // When the error is not already an APIError convert it
  // to an APIError
  if (!isAPIError) {
    const statusCode = httpStatus.INTERNAL_SERVER_ERROR
    const message = error.message || httpStatus[statusCode].toString()

    error = new APIError(statusCode, message, err.stack)

    console.log('Converted')
  }

  next(error)
}

/**
 * Send the actual APIError to the client
 */
const handler = (err: APIError, _req: Request, res: any, _next: NextFunction): void => {
  const { statusCode, message } = err
  log.error(err.message)

  res.locals.errorMessage = err.message

  const response = {
    code: statusCode,
    sentryId: res.sentry,
    message,
    stack: env.nodeEnv === 'development' ? err.stack : undefined
  }

  res.status(statusCode).json(response)
}

export { converter, handler }
