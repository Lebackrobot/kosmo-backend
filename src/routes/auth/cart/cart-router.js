import express from 'express'
import authorization from '../authorization.js'
import cartController from '../../../controllers/cart/cart-controller.js'

const cartRouter = express.Router()

cartRouter
    .get('/cart', authorization, cartController.getByUserId)

export default cartRouter