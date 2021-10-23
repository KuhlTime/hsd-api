import { Router } from 'express'
import publicRouter from './public'

// create a new top level router and export it
const router = Router()

router.use('/', publicRouter)

export default router
