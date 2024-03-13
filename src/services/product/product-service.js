import dbConnection from "../../../config/db-connect.js"
import { productModel } from  "../../models/product/product-model.js"

export default {
    getById: async (productId) => {
        return await new Promise((resolve, reject) => {
            dbConnection.query(`SELECT * FROM products WHERE id = ?`, [productId], (err, query) => {
                if (err) {
                    return reject(err)
                }

                if (query.length == 0) {
                    return resolve()
                }

                const product = query[0]

                const response = productModel(
                    product.id,
                    product.name,
                    product.price,
                    product.stock,
                    product.created_at,
                    product.updated_at
                )

                return resolve(response)
            })
        })
    }
}