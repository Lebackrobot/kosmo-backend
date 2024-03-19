import cartService from '../../services/cart/cart-service.js'
import { saleReadModel } from '../../models/sale/sale.model.js'
import { haveStock } from '../../utils/stockCalculation.js'
import stockService from '../../services/stock/stock-service.js'

export default {
    sale: async (require, response) => {
        try {
            const { id: userId, name: username, email } = require.user
            const { id: cartId } = await cartService.getCartByUserId(userId)

            const products = await cartService.getCartProductsByUserId(userId)

            if (!products || !products.length) {
                return response.status(400).send({ success: false, message: 'Cart is empty' })
            }

            // Stock validation
            products.forEach(async product => {
                if (!await haveStock(product.id, product.quantity)) {
                    return response.status(400).send({ sucess: false, message: 'Dont have stock'})
                }
            })

            // update stock
            products.forEach(async product => {
                const stock = await stockService.getStockByProdcutId(product.id)
                stockService.updateStockByProductId(product.id, stock.quantity - product.quantity)
            })

            const totalPrice = products.reduce((acc, product) => acc + product.price * product.quantity, 0)
            
            // Remove all products
            products.forEach(product => {
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