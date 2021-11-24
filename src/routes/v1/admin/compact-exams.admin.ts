import { Router } from 'express'
import { validator } from '@/middlewares'
import CompactExamSchema from '@/validations/compact-exam.validation'
import CompactExam from '@/models/CompactExam'
import { upsertCompactExam } from '@/controller/compact-exam.controller'

const router = Router()

router.post('/', validator.body(CompactExamSchema), async (req, res) => {
  const exam = {
    ...req.body,
    timestamp: new Date(req.body.timestamp)
  } as CompactExam

  await upsertCompactExam(exam)

  res.send({
    success: true,
    message: `Upsert '${exam.id}' successfull`
  })
})

export default router
