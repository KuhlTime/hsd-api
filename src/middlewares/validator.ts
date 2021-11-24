/* eslint-disable sonarjs/no-identical-functions */

import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { Schema } from 'joi'
import APIError from '@/models/APIError'

const query =
  (schema: Schema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.query)
    if (error) next(new APIError(httpStatus.BAD_REQUEST, error.message))
    else next()
  }

const body =
  (schema: Schema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body)
    if (error) next(new APIError(httpStatus.BAD_REQUEST, error.message))
    else next()
  }

const params =
  (schema: Schema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.params)
    if (error) next(new APIError(httpStatus.BAD_REQUEST, error.message))
    else next()
  }

export { query, body, params }
