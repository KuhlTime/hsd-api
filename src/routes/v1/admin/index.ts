import { Router } from 'express'
import compactExamsRouter from './compact-exams.admin'

const router = Router()

router.use('/compact-exams', compactExamsRouter)

export default router
