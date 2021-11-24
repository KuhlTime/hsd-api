import { Router } from 'express'
import Joi from 'joi'
import httpStatus from 'http-status'
import { validator } from '@/middlewares'
import PersistenceManager from '@/models/PersistenceMananger'
import APIError from '@/models/APIError'

const router = Router()

router.get('/', async (req, res) => {
  res.json(PersistenceManager.shared.getCourses())
})

router.get('/:Id', validator.params(Joi.object({ Id: Joi.string().required() })), (req, res) => {
  const id = req.params.Id
  const course = PersistenceManager.shared.getCourse(id)

  if (!course) throw new APIError(httpStatus.NOT_FOUND, `Could not find course with id: ${id}`)

  res.json(course)
})

export default router
