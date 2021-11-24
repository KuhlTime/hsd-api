import { Router } from 'express'
import examsRouter from './exams'

const router = Router()

router.use('/exams', examsRouter)

export default router
