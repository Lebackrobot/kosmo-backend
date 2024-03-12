import express from 'express'
import authorization from '../authorization.js'
import produtController from '../../../controllers/product/produt-controller.js'

const productRouter = express.Router()

productRouter
    .get('/products/:id', authorization, produtController.getById)

export default productRouter