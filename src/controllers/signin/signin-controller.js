import jwt from 'jsonwebtoken'
import userService from '../../services/user/user-service.js'
import passwordCrypto from '../../utils/password-crypto.js'

export default {
    signin: async (require, response) => {
        try {
            const secretKey = process.env.JWT_SECRET_KEY
            const { email, password } = require.body

            if (!email || !password) {
                return response.status(400).send({ success: false, message: 'Email or password is required' })
            } 

            const user = await userService.getByEmail(email)

            if(!user) {
                return response.status(404).send({ sucess: false, message: 'User not found'})
            }

            if (!passwordCrypto.verifyPassword(password, user.password)) {
                return response.status(401).send({ success: false, message: 'Unauthorized' })
            }


            const token = jwt.sign({ userId: user.id }, secretKey,{expiresIn: '3h'} )
            return response.status(200).send({ success: true, data: { token }, message: 'Success to signin'})            
        }

        catch (err) {
            console.error(err)
            return response.status(500).send({ success: false, message: 'Internal server error' })
        }
    }
}