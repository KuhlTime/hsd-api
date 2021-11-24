import { Router } from 'express'
import PersistenceManager from '@/models/PersistenceMananger'
import { validator } from '@/middlewares'
import IdSchema from '@/validations/id.validator'

const router = Router()

router.get('/', async (req, res) => {
  const exams = PersistenceManager.shared.getCompactExams()
  res.json(exams)
})

router.get('/:Id', validator.query(IdSchema), (req, res) => {
  const exam = PersistenceManager.shared.getCompactExam(req.params.Id)
  res.json(exam)
})

export default router
