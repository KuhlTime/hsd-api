import { Router } from 'express'
import Joi from 'joi'
import httpStatus from 'http-status'
import { validator } from '@/middlewares'
import PersistenceManager from '@/models/PersistenceMananger'
import APIError from '@/models/APIError'

const router = Router()

router.get('/', (req, res) => {
  res.json(PersistenceManager.shared.getDegrees())
})

router.get('/:Id', validator.params(Joi.object({ Id: Joi.string().required() })), (req, res) => {
  const id = req.params.Id
  const degree = PersistenceManager.shared.getDegree(id)

  if (!degree) throw new APIError(httpStatus.NOT_FOUND, `Could not find degree with id: ${id}`)

  res.json(degree)
})

export default router
