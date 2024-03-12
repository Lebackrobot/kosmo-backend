import jwt from 'jsonwebtoken'
import userService from '../../services/user/user-service.js'

const authorization = (require, response, next) => {
    const secretKey = process.env.JWT_SECRET_KEY
    const token = require.headers.authorization

    console.log(token)

    if (!token) {
        return response.status(401).json({ success: false, message: 'Token is required' })
    }

    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
            return response.status(403).json({ success: false, message: err})
        }

        const user = await userService.getById(decoded.userId)

        if (!user) {
            return response.status(403).json({ success: false, message: 'Invalid token'})   
        }

        require.user = { ...user }
        return next()
    })

}

export default authorization