import { Router } from 'express'
import examsRouter from './exams.route'
import historyRouter from './history.route'
import coursesRouter from './courses.route'

const router = Router()

router.use('/exams', examsRouter)
router.use('/history', historyRouter)
router.use('/courses', coursesRouter)

export default router
