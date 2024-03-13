import dbConnection from "../../../config/db-connect.js"
import { cartModel }  from '../../models/cart/cart-model.js'

export default {
    getByUserId: async (userId) => {
        return await new Promise((resolve, reject) => {
            console.log(userId)
            dbConnection.query(
                `SELECT p.name, p.price, p.stock 
                FROM carts c 
                JOIN carts_products cp ON cp.cart_id = c.id
                JOIN products p ON cp.product_id = p.id
                WHERE c.user_id = ?`,
                
                
                [userId], (err, query) => {
                if (err) {
                    return reject(err)
                }

                console.log(query)
                
                if (query.length == 0) {
                    return resolve()
                }


                //const product = query[0]

               /*  const response = productModel(
                    product.id,
                    product.name,
                    product.price,
                    product.stock,
                    product.created_at,
                    product.updated_at
                ) */

                return resolve()
            })
        })
    }
}