import express from 'express'
import signupRouter from './noauth/signup/signup-route.js'
import signinRouter from './noauth/signin/signin-router.js'

const routes = (app) => {

    app.use(express.json())
    app.use('/noauth', signupRouter, signinRouter)
}

export { routes }