import express from 'express'
import dbConnection from '../configs/db-connect.js'

const app = express()

dbConnection.on('error', () => console.error(err))
dbConnection.on('connect', () => console.log('🗃️  Success to connect on db'))

app.use(express.json())

export default app