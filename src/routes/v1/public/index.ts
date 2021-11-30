import { Router } from 'express'
import examsRouter from './exams'
import degreesRouter from './degrees'
import examinersRouter from './examiners'
import icalRouter from './ical'

const router = Router()

router.use('/exams', examsRouter)
router.use('/degrees', degreesRouter)
router.use('/examiners', examinersRouter)
router.use('/ical', icalRouter)

export default router
