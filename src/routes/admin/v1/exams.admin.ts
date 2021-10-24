import { Router } from 'express'

const router = Router()

router.post('/:Id', async (req, res) => {
  res.send('Recieved')
})

export default router
