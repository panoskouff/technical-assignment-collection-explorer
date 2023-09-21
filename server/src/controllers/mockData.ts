import { Request, Response, NextFunction } from 'express'
import ServerMemoryContext from '../ServerMemoryContext'

// http://localhost:3000/api/mockdata/customers
const getCustomers = (req: Request, res: Response, next: NextFunction) => {
  const customers = ServerMemoryContext.get('mockDataCustomers')
  return res.type('application/json').status(200).send(customers)
}

export default {
  getCustomers,
  // ...
}
