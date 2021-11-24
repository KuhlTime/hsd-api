import { Router } from 'express'
import v1Router from './v1'

const router = Router()

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the HSD API',
    author: {
      name: 'André Kuhlmann',
      email: 'andre@kuhlti.me',
      github: 'https://github.com/KuhlTime'
    },
    routes: {
      v1: {
        exams: '/v1/exams'
      }
    }
  })
})

router.use('/v1', v1Router)

export default router
