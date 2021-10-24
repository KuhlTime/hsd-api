import httpStatus from 'http-status'
import { NextFunction, Request, Response } from 'express'
import APIError from '@/models/APIError'
import randomValue from '@/lib/randomArrayValue'

/**
 * Middleware that returns 404 error
 */
export default (req: Request, res: Response, next: NextFunction): void => {
  const error = new APIError(
    httpStatus.NOT_IMPLEMENTED,
    randomValue([
      'You found something that is not there yet. 😮',
      'Are you from the future? That route is not implmented yet. 😳',
      'This route is not implemented yet. 😶‍🌫️',
      'The developer was lazy and has not implmented this route yet. 😡'
    ])
  )
  next(error)
}
