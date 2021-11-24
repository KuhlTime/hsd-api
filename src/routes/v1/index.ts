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
    message: 'Welcome to the hsd-api.',
    github: 'https://github.com/KuhlTime/hsd-api',
    data: {
      courses: `${env.url}/v1/courses`,
      degrees: `${env.url}/v1/degrees`,
      exams: `${env.url}/v1/exams`
    },
    author: {
      name: 'André Kuhlmann',
      email: 'andre.kuhlmann@study.hs-duesseldorf.de',
      links: ['https://kuhlti.me', 'https://github.com/KuhlTime']
    }
  })
})

export default router
