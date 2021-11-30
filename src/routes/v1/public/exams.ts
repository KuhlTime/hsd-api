import { Router } from 'express'
import PersistenceManager from '@/models/PersistenceMananger'

const router = Router()

router.get('/', async (req, res) => {
  const exams = PersistenceManager.shared.getCompactExams()
  res.json(exams)
})

router.get('/:Id', (req, res) => {
  const exam = PersistenceManager.shared.getCompactExam(req.params.Id)
  res.json(exam)
})

export default router
