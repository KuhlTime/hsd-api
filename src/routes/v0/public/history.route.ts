import { Router } from 'express'
import notImplemented from '@/middlewares/notImplemented'

const router = Router()

router.get('/', notImplemented)

export default router
