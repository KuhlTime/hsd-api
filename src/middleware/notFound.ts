import httpStatus from 'http-status'
import { NextFunction, Request, Response } from 'express'
import APIError from '@/models/APIError'

export default (req: Request, res: Response, next: NextFunction): void => {
  const error = new APIError(httpStatus.NOT_FOUND, 'Not Found')
  next(error)
}
