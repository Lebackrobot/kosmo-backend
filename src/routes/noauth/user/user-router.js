import express from 'express'
import userController from '../../../controllers/user/user-controller.js'

const userRouter = express.Router()

userRouter
    .get('/users', userController.getAll)
    .get('/users/:id', userController.getById)
    .post('/users', userController.create)
    
export default userRouter