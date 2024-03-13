import express from 'express'

import userRouter from './noauth/user/user-router.js'
import signinRouter from './noauth/signin/signin-router.js'
import productRouter from './auth/product/product-router.js'
import cartRouter from './auth/cart/cart-router.js'

const routes = (app) => {

    app.use(express.json())
    app.use('/auth', productRouter, cartRouter)
    app.use('/noauth', userRouter, signinRouter)
}

export { routes }