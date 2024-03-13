import cartService from "../../services/cart/cart-service.js"


export default {
    getByUserId: async (require, response) => {
        try {
            const { userId } = require.user

            const cartProducts = await cartService.getByUserId(userId)

            if (!cartProducts) {
                return response.status(404).send({ success: false, message: 'user card not found'})
            }
            
            console.log(cartProducts)


            return response.status(200).send({message: 'ok'})

        }

        catch(err) {
            return response.status(500).send({ success: false, message: err.message })
        }
    }
}