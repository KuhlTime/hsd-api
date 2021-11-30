import { Router } from 'express'
import PersistenceManager from '@/models/PersistenceMananger'

const router = Router()

router.get('/', async (req, res) => {
  const examiners = PersistenceManager.shared.getCompactExamExaminers()
  res.json(Array.from(examiners))
})

export default router
