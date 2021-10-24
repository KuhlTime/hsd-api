import { Router } from 'express'
import { ExamQueryType, examsSchema } from '@/validations/exam.validation'
import { validator } from '@/middlewares'
import PersistenceManager from '@/models/PersistenceMananger'

const router = Router()

router.get('/', validator.query(examsSchema), async (req, res) => {
  const exams = PersistenceManager.shared.getExams()
  res.json(exams.map(exam => exam.toJSON()))
})

export default router
