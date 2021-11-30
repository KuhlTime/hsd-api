import { Router } from 'express'
import PersistenceManager from '@/models/PersistenceMananger'

const router = Router()

router.get('/test', (req, res) => {
  const cal = PersistenceManager.shared.createTestCalender()
  cal.serve(res)
})

router.get('/:Id', async (req, res) => {
  const examIds = req.params.Id.split(',')
  const cal = PersistenceManager.shared.createCalenderForExams(examIds)
  cal.serve(res)
})

export default router
