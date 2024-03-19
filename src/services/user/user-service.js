import dbConnection from '../../../configs/db-connect.js'
import { userReadModel } from '../../models/user/user-model.js'

export default {
    getById: async (id) => {
        return await new Promise((resolve, reject) => {
            dbConnection.query(`SELECT * FROM users WHERE id = ?`, [id], (err, response) => {
                if (err) {
                    return reject(err)
                }

                return resolve(response[0])
            })
        })
    },

    getByEmail: async (email) => {
        return await new Promise((resolve, reject) => {
            dbConnection.query(`SELECT * FROM users WHERE email = ?`, [email], (err, response) => {
                if (err) {
                    return reject(err)
                }

                const user = response[0]
                if(!user) {
                    return resolve()
                }

                return resolve(userReadModel(
                    user.id,
                    user.name,
                    user.password,
                    user.email, 
                    user.createdAt,
                    user.updatedAt
                ))
            })
        })
    },

    createUser: async (user) => {
        return await new Promise((resolve, reject) => {
            dbConnection.query(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [user.name, user.email, user.password], (err, response) => {
                if (err) {
                    return reject(err)
                }

                return resolve(response)
            })
        })
    }
}