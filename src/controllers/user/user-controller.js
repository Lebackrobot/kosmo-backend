import { createUserModel } from '../../models/user/user-model.js'
import userService from './../../services/user/user-service.js'

export default {
    getAll: async (require, response) => {
        try{ 
            const users = await userService.getAll()
            return response.status(200).send({ success: true, data: users })
        }

        catch (err) {
            return response.status(500).send({ success: false, message: err.message })

        }
    },

    getById: async (require, response) => {
        try {
            const user = await userService.getById(require.params.id)

            if (!user) {
                return response.status(404).send({ success: false, message: 'User is not found'})
            }
        

            return response.status(200).send({ success: true, data: user })
        }

        catch (err) {
            return response.status(500).send({ success: false, message: err.message })
        }
    },

    create: async (require, response) => {
        try {
            const payload = require.body

            if (!payload.name) {
                return response.status(400).send({ success: false, message: 'name is required'})
            }

            else if (!payload.email || !payload.password) {
                return response.status(400).send({ success: false, message: 'email and password is required'})
            }

            const user = await userService.getByEmail(payload.email)

            if (user) {
                return response.status(409).send({ success: false, message: 'user email alredy exist'})
            }

            await userService.create(createUserModel(
                payload.name,
                payload.email,
                payload.password,
            ))

            return response.status(201).send({ success: true, message: 'user created' })
        }

        catch (err) {
            response.status(500).send({success: false, message: err.message})
        }
    }
}