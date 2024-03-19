import cartService from '../../services/cart/cart-service.js'
import { saleReadModel } from '../../models/sale/sale.model.js'

export default {
    sale: async (require, response) => {
        try {
            const { id: userId, name: username, email } = require.user
            const { id: cartId } = await cartService.getCartByUserId(userId)

            const products = await cartService.getCartProductsByUserId(userId)

            console.log(products)

            if (!products || !products.length) {
                return response.status(400).send({ success: false, message: 'Cart is empty' })
            }

            const totalPrice = products.reduce((acc, product) => acc + product.price * product.quantity, 0)
            
            
            // Remove all products
            products.forEach(product => {
                console.log('delete')
                console.log(cartId)
                console.log(product)
                cartService.deleteProductByCartIdAndProductId(cartId, product.id)
            })
            
            const aggData = saleReadModel(username, email, products, `R$${totalPrice.toFixed(2)}`)
            return response.status(200).send({ success: true, data: aggData, message: 'success to sale cart' })
        }

        catch (err) {
            console.error(err)
            return response.status(500).send({ success: false, message: 'Internal server error' })
        }
    }
}