import { Router } from 'express'
import PersistenceManager from '@/models/PersistenceMananger'

const router = Router()

router.get('/', async (req, res) => {
  const degrees = PersistenceManager.shared.getCompactExamExaminers()
  res.json(Array.from(degrees))
})

export default router
