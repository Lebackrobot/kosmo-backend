import express from 'express'
import saleController from '../../../controllers/sale/sale-controller.js'

const saleRouter = express.Router()

saleRouter.post('/sales', saleController.sale)

export default saleRouter