import cartService from '../../services/cart/cart-service.js'
import userService from '../../services/user/user-service.js'

import passwordCryto  from '../../utils/password-crypto.js'
import { userCreateModel } from './../../models/user/user-model.js'


export default {
    createUser: async (require, response) => {
        try {
            const payload = require.body
    
            if (!payload.name) {
                return response.status(400).send({ success: false, message: 'Name is required'})
            }

            if (!payload.email) {
                return response.status(400).send({ success: false, message: 'Email is required' })
            }

            if (!payload.password) {
                return response.status(400).send({ success: false, message: 'Password is required' })
            }

            const user = await userService.getByEmail(payload.email) 

            if (user) {
                return response.status(409).send({ success: false, message: 'User alreary exists'})
            }

            const hashedPassword = await passwordCryto.hashPassword(payload.password)
            
            await userService.createUser(userCreateModel(
                payload.name,
                payload.email,
                hashedPassword
            ))

            // Create cart 
            const { id: userId } = await userService.getByEmail(payload.email) 

            cartService.createCartByUserId(userId)

            return response.status(201).send({ success: true, data: user, message: 'Success to create user'})
            
        }

        catch (err) { 
            console.error(err)
            response.status(500).send({ success: false, message: 'Internal server error'})
        }

    }
}