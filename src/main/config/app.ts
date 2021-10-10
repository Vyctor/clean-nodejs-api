import express from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'

const app = express()
setupMiddlewares(app)
setupRoutes(app).catch(error => { throw new Error(error) })

export default app
