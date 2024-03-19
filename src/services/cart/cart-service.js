import dbConnection from '../../../configs/db-connect.js'
import { cartReadModel } from '../../models/cart/cart-model.js'
import { productReadModel } from '../../models/product/product-model.js'

export default {
    getCartByUserId: async (userId) => {
        return await new Promise((resolve, reject) => {
            dbConnection.query(
                `SELECT * FROM carts WHERE user_id = ?`, [userId], (err, response) => {
                    if (err) {
                        return reject()
                    }


                    return resolve(cartReadModel(
                        response[0].id,
                        response[0].user_id,
                        response[0].created_at,
                        response[0].updated_at
                    ))
                }
            )
        })
    },

    getCartProductsByUserId: async (userId) => {
        return await new Promise((resolve, reject) => {
            dbConnection.query(
                `SELECT p.id, p.name, p.price, cp.quantity
                    FROM carts c
                JOIN carts_products cp ON cp.cart_id = c.id
                JOIN products p ON cp.product_id = p.id
                WHERE c.user_id = ?`,
                [userId],
                (err, response) => {
                    if (err) {
                        return reject(err)
                    }


                    return resolve(response.map(product => {
                        return productReadModel(product.id, product.name, product.price, product.quantity)
                    }))
                }
            )
        })
    },

    getProductByCartIdAndProductId: async (cartId, produtId) => {
        return await new Promise((resolve, reject) => {
            dbConnection.query(
                `SELECT * FROM carts_products 
                WHERE cart_id = ? AND product_id = ?`,
                [cartId, produtId],
                (err, response) => {
                    if (err) {
                        return reject(err)
                    }
    
                    return resolve(response[0])
                }
            )
        })
    },

    updateProductByCartIdAndProductObj: async (cartId, product) => {
        return await new Promise((resolve, reject) => {
            const now = new Date();

            dbConnection.query(
                `UPDATE carts_products SET quantity = ?, updated_at = ?
                WHERE cart_id = ? AND product_id = ?`,
                [product.quantity, now, cartId, product.id],
                (err, response) => {
                    if (err) {
                        return reject(err)
                    }
    
                    return resolve(response)
                }
            )
        })

    },

    createCartProductByCartIdAndProductObj: async (cartId, product) => {
        return await new Promise((resolve, reject) => {
            dbConnection.query(`INSERT INTO carts_products (cart_id, product_id, quantity) VALUES (?, ?, ?)`, [cartId, product.id, product.quantity], (err, response) => {
                if (err) {
                    return reject(err)
                }
    
                return resolve(response)
            })
        })
    },


    deleteProductByCartIdAndProductId: async (cartId, productId) => {
        return await new Promise((resolve, reject) => {
            dbConnection.query(
                `DELETE FROM carts_products
                WHERE cart_id = ? AND product_id = ?`, [cartId, productId], (err, response) => {
                if (err) {
                    return reject(err)
                }

                return resolve(response)
            })
        })
    },

    createCartByUserId: async (userId) => {
        return await new Promise((resolve, reject) => {
            dbConnection.query(
                `INSERT INTO carts (user_id) VALUES (?)`
                , [userId], (err, response) => {
                if (err) {
                    return reject(err)
                }

                return resolve(response)
            })
        })
    }
}