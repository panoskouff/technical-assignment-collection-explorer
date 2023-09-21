import express from 'express'

import controller from '../../controllers/mockData'

const router = express.Router()

router.get('/customers', controller.getCustomers)

export default router
