import httpStatus from 'http-status'
import { NextFunction, Request, Response } from 'express'
import APIError from '@/models/APIError'
import randomValue from '@/lib/randomArrayValue'

/**
 * Middleware that returns 404 error
 */
export default (req: Request, res: Response, next: NextFunction): void => {
  const error = new APIError(
    httpStatus.NOT_FOUND,
    randomValue([
      'It is not the end of the world, but certainitly the end of this website. 😪',
      'There is nothing to see here 🤐.',
      'Great you found NOTHINGNESS. 😑',
      "It's empty here. 😶"
    ])
  )
  next(error)
}
