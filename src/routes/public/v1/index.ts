import { Router } from 'express'
import examsRouter from './exams.route'
import historyRouter from './history.route'

const router = Router()

router.use('/exams', examsRouter)
router.use('/history', historyRouter)

export default router
