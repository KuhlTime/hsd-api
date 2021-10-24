import { Router } from 'express'
import { ExamQueryType, examsSchema } from '@/validations/exam.validation'
import { validator } from '@/middlewares'
import { getExams } from '@/controller/exam.controller'

const router = Router()

router.get('/', validator.query(examsSchema), async (req, res) => {
  const query = req.query as ExamQueryType

  const exams = await getExams()

  res.json(exams.map(exam => exam.toJSON()))
})

export default router
