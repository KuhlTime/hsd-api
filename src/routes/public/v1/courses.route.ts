import { Router } from 'express'
import { validator } from '@/middlewares'
import PersistenceManager from '@/models/PersistenceMananger'

const router = Router()

router.get('/', async (req, res) => {
  res.json(PersistenceManager.shared.getCourses())
})

export default router
