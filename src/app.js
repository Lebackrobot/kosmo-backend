import express from 'express'
import dbConnection from './../config/db-connect.js'

import { routes } from './routes/index.js'

const app = express()

app.use(express.json())
routes(app)

dbConnection.on('error', (err) => {console.error(err)})
dbConnection.on('connect', () => {console.log('Success to connect on db')})

export default app