import { Router } from 'express'
import Joi from 'joi'
import httpStatus from 'http-status'
import { examsSchema } from '@/validations/exam.validation'
import { validator } from '@/middlewares'
import PersistenceManager from '@/models/PersistenceMananger'
import APIError from '@/models/APIError'

const router = Router()

router.get('/', validator.query(examsSchema), async (req, res) => {
  const exams = PersistenceManager.shared.getExams()
  res.json(exams.map(exam => exam.toJSON()))
})

router.get('/:Id', validator.params(Joi.object({ Id: Joi.string().required() })), (req, res) => {
  const id = req.params.Id
  const exam = PersistenceManager.shared.getExam(id)

  if (!exam) throw new APIError(httpStatus.NOT_FOUND, `Could not find exam with id: ${id}`)

  res.json(exam)
})

export default router
