import jwt from 'jsonwebtoken'
import userService from "../../services/user/user-service.js"

export default {
    signin: async (require, response) => {
        const secretKey = process.env.JWT_SECRET_KEY
        const { email, password } = require.body

        if (!email || !password) {
            return response.status(400).send({ success: false, message: 'Email and password are required' })
        }

        const user = await userService.getByEmail(email)

        if (!user) {
            return response.status(404).send({ success: false, message: 'Invalid user'})
        }


        else if (password != user.password) {
            return response.status(400).send({ success: false, message: 'Invalid password'})
        }

        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '3h' })
        return response.status(200).send({success: true, token}) 
    }
}