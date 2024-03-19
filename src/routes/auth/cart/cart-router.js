import express from 'express'
import cartController from '../../../controllers/cart/cart-controller.js'

const cartRouter = express.Router()

cartRouter.get('/carts', cartController.getByUserId)
cartRouter.post('/carts', cartController.createCartProduct)
cartRouter.put('/carts/:cartId', cartController.updateCartProductByCartId)
cartRouter.delete('/carts/:cartId', cartController.deleteProductInCartProduct)
cartRouter.delete('/carts', cartController.emptyCart)

export default cartRouter