import { productUpdateModel } from '../../models/product/product-model.js'
import { haveStock } from '../../utils/stockCalculation.js'
import cartService from '../../services/cart/cart-service.js'


export default {
    getByUserId: async (require, response) => {
        try {
            const { id: userId } = require.user

            if (!userId) {
                return response.status(400).send({ success: false, message: 'User id is required' })
            }

            const cart = await cartService.getCartByUserId(userId)
            const products = await cartService.getCartProductsByUserId(userId)

            
            return response.status(200).send({ 
                success: true,  
                data: { ...cart, products },
                message: 'Success to get cart'
                
            })
        }

        catch (err) {
            return response.status(500).send({ success: false, message: `Internal server error ${err}`})
        }
    },

    updateCartProductByCartId: async (require, response) => {
        try {
            const { cartId } = require.params

            const { productId, quantity } = require.body

            if (!productId) {
                return response.status(400).send({ success: false, message: 'product id is required' })
            }

            if (!quantity) {
                return response.status(400).send({ success: false, message: 'quantity is required' })
            }

            
            const product = await cartService.getProductByCartIdAndProductId(cartId, productId)
            
            if (!product) {
                return response.status(404).send({ success: false, message: 'Product not found'})
            }

            // Stock validation
            if ( !await haveStock(productId, quantity) ) {
                return response.status(400).send({ success: false, message: 'Dont have stock' })
            }


            // Update
            await cartService.updateProductByCartIdAndProductObj(
                cartId,
                productUpdateModel(productId, quantity)
            )

            const productUpdated = await cartService.getProductByCartIdAndProductId(cartId, productId)

            

            return response.status(200).send({ success: true, data: productUpdated, message: 'Success to update product'})


        }

        catch (err) {
            return response.status(500).send({ success: false, message: `Internal server error ${err}` })
        }
    },

    createCartProduct: async (require, response) => {
        try {
            const { id: userId } = require.user
            const { productId, quantity } = require.body

            if (!productId) {
                return response.status(400).send({ success: false, message: 'product id is required'})
            }

            if (!quantity) {
                return response.status(400).send({ success: false, message: 'quantity is required' })
            }

            const { id: cartId } = await cartService.getCartByUserId(userId)
            const product = await cartService.getProductByCartIdAndProductId(cartId, productId)


            if (product) {
                return response.status(409).send({ success: false, message: 'product already exist'})
            }

            // Stock validation
            if (! await haveStock(productId, quantity)) {
                return response.status(400).send({ success: false, message: 'Dont have stock' })
            }

            // Create cartProduct
            await cartService.createCartProductByCartIdAndProductObj(
                cartId, productUpdateModel(productId, quantity)
            )

            // Update cartProdcut
            await cartService.getProductByCartIdAndProductId(cartId, productId)

            const cart = await cartService.getCartByUserId(userId)
            const products = await cartService.getCartProductsByUserId(userId)


            return response.status(201).send({
                success: true,
                data: { ...cart, products },
                message: 'Success to add product in cart'

            })


            return response.status(201).send({ success: true, data: newProduct, message: 'Success to add product' })
        }

        catch (err) {
            return response.status(500).send({ success: false, message: `Internal server error ${err}`})
        }
    },

    deleteProductInCartProduct: async (require, response) => {
        try {
            const { cartId } = require.params
            const { productId } = require.body
            
            
            if (!productId) {
                return response.status(400).send({ success: false, message: 'productId id is required' })
            }

            const product = await cartService.getProductByCartIdAndProductId(cartId, productId)

            if (!product) {
                return response.status(400).send({ success: false, message: 'product not found' })
            }

            // Delete product 
            await cartService.deleteProductByCartIdAndProductId(cartId, productId)
            
            return response.status(200).send({ success: true, message: 'cart product was removed'})
        }


        catch (err) {
            return response.status(500).send({ success: false, message: `Internal server error ${err}` })
        }
    }
}