import express from 'express'
import controller from '../../controllers/generic'

const router = express.Router()

router.get('/status', controller.healthCheck)

export default router
