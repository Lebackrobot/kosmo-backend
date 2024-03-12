import dbConnection from "../../../config/db-connect.js"
import { userModel } from "../../models/user/user-model.js"

export default {
    getAll: async () => {
        return await new Promise((resolve, reject) => {

            dbConnection.query(`SELECT * FROM users`, (err, query) => {
                if (err) {
                    return reject(err)
                }

                const response = query.map(user => {
                    return userModel(
                        user.id, 
                        user.name,
                        user.email,
                        user.password,
                        user.created_at,
                        user.updated_at
                    )
                })

                return resolve(response)
            })
        })
    },

    getById: async (userId) => {
        return await new Promise((resolve, reject) => {
            dbConnection.query(`SELECT * FROM users WHERE id = ?`, [userId], (err, query) => {
                if (err) {
                    reject(err)
                }
                
                if (query.length == 0) {
                    return resolve()
                }
                
                const user = query[0]

                const response = userModel(
                        user.id,
                        user.name,
                        user.email,
                        user.password,
                        user.created_at,
                        user.updated_at
                    )

                return resolve(response)
            })
        })
    },

    getByEmail: async (userEmail) => {
        return await new Promise((resolve, reject) => {
            dbConnection.query(`SELECT * FROM users WHERE email = ?`, [userEmail], (err, query) => {
                if (err) {
                    reject(err)
                }
                
                if (query.length == 0) {
                    return resolve()
                }
                
                const user = query[0]

                const response = userModel(
                        user.id,
                        user.name,
                        user.email,
                        user.password,
                        user.created_at,
                        user.updated_at
                    )

                return resolve(response)
            })
        })
    },

    create: async (user) => {
        return await new Promise((resolve, reject) => {
            dbConnection.query(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [user.name, user.email, user.password] , (err, query) => {
                if (err) {
                    reject(err)
                }

                return resolve()
            })
        })
    }
}