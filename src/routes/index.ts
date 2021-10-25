import { Request, Response, Router } from 'express'
import publicRouter from './public'
import env from '@env'

// create a new top level router and export it
const router = Router()

router.use('/', publicRouter)

router.get('/', (req: Request, res: Response) => {
  res.send({
    message: 'Welcome to the hsd-api.',
    github: 'https://github.com/KuhlTime/hsd-exam-schedule',
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
