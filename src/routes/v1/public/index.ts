import { Router } from 'express'
import examsRouter from './exams'
import degreesRouter from './degrees'
import examinersRouter from './examiners'

const router = Router()

router.use('/exams', examsRouter)
router.use('/degrees', degreesRouter)
router.use('/examiners', examinersRouter)

export default router
