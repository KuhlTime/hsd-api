import httpStatus from 'http-status'
import { NextFunction, Request, Response } from 'express'
import APIError from '@/models/APIError'
import env from '@/config/env'

/**
 * Middleware that returns 404 error
 */
export default (req: Request, res: Response, next: NextFunction): void => {
  if (req.headers.authorization !== env.secretKey) {
    const err = new APIError(httpStatus.UNAUTHORIZED, 'Unauthorized')
    next(err)
  } else {
    next()
  }
}
