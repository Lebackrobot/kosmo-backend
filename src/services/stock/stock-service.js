import dbConnection from '../../../configs/db-connect.js'
import { stockReadModel } from '../../models/stock/stock-model.js'

export default {
    getStockByProdcutId: async (productId) => {
        return await new Promise((resolve, reject) => {
            dbConnection.query(`SELECT * FROM stocks WHERE product_id = ?`, [productId], (err, response) => {
                if (err) {
                    return reject(err)
                }

                return resolve(stockReadModel(
                    response[0].product_id,
                    response[0].quantity
                ))
            })
        })
    },

    updateStockByProductId: async (productId, quantity) => {
        return await new Promise((resolve, reject) => {
            const now = new Date();

            dbConnection.query(
                `UPDATE stocks SET quantity = ?, updated_at = ?
                WHERE product_id = ?`,
                [quantity, now, productId],
                (err, response) => {
                    if (err) {
                        return reject(err)
                    }

                    return resolve(response)
                }
            )
        })
    }
}