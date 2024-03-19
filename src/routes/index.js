import express from 'express'
import signupRouter from './noauth/signup/signup-route.js'
import signinRouter from './noauth/signin/signin-router.js'
import authorization from './auth/authorization.js'
import cartRouter from './auth/cart/cart-router.js'
import saleRouter from './auth/sale/sale-router.js'

const routes = (app) => {

    app.use(express.json())
    app.use('/auth', authorization, cartRouter, saleRouter)
    app.use('/noauth', signupRouter, signinRouter)
}

export { routes }