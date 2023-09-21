import http from 'http'
import express, { Request, Response, NextFunction } from 'express'
import logging from './config/logging'
import config from './config/config'
import mockDataAPIRoutes from './routes/api/mockData'
import genericAPIRoutes from './routes/api/generic'
import ServerMemoryContext from './ServerMemoryContext'
import fs from 'fs'
import path from 'path'

// On Server Initialization
ServerMemoryContext.init()

const NAMESPACE = 'Server'
const router = express()

router.use((req, res, next) => {
  /** Log the req */
  logging.info(
    NAMESPACE,
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`,
  )

  res.on('finish', () => {
    /** Log the res */
    logging.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`,
    )
  })

  next()
})

/** Parse the body of the request */
router.use(express.urlencoded({ extended: true }))
router.use(express.json())

/** Rules of our API */
router.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  )

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }

  next()
})

// http://localhost:3000/api/status
// http://localhost:3000/api/mockdata/customers

/** Routes */
router.use('/api/', genericAPIRoutes)
router.use('/api/mockdata', mockDataAPIRoutes)

/* we decided to serve our app at root, but we could also
  configure it under a basepath and have also other clients */
const collectionExplorerPath = path.join(__dirname, '../../client/dist')
const spaBuildExists = fs.existsSync(collectionExplorerPath)
if (spaBuildExists) {
  router.use(express.static(collectionExplorerPath))

  router.get('*', (req, res) => {
    res.sendFile(path.join(collectionExplorerPath, 'index.html'))
  })
}

/** Error handling */
router.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Not found')

  res.status(404).json({
    message:
      spaBuildExists === false
        ? `The directory ${collectionExplorerPath} does not exist. Make sure to build your client app.`
        : error.message,
  })
})

const httpServer = http.createServer(router)

export default httpServer.listen(config.server.port, () =>
  logging.info(
    NAMESPACE,
    `Server is running ${config.server.hostname}:${config.server.port}`,
  ),
)
