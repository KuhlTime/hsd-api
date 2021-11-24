import { Request, Response, Router } from 'express'
import publicRouter from './public'
import adminRouter from './admin'
import env from '@env'
import { apiToken } from '@/middlewares'

// create a new top level router and export it
const router = Router()

router.use('/admin', apiToken, adminRouter)
router.use('/', publicRouter)

router.get('/', (req: Request, res: Response) => {
  res.send({
    routes: {
      exams: `/v1/exams`
    }
  })
})

export default router
