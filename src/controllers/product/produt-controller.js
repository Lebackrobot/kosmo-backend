import productService from '../../services/product/product-service.js'

export default {
    getById: async (require, response) => {
        try {
            const { productId } = require.params
            const product = await productService.getById(productId)

            if (!product) {
                return response.status(404).send({ success: false, message: 'product is not found'})
            }

            return response.status(200).send({ sucess: true, data: product })

        }

        catch (err) {
            return response.status(500).send({ success: false, message: err.message })
        }
    }
}