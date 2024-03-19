import express from 'express'
import dbConnection from '../configs/db-connect.js'
import { routes } from './routes/index.js'

const app = express()
routes(app)

dbConnection.on('error', () => console.error(err))
dbConnection.on('connect', () => console.log('🗃️  Success to connect on db'))

export default app