import { Router } from 'express'
import checkoutController from '../controllers/checkoutController.js'

const routercheckout = Router()

const checkout = new checkoutController()

routercheckout.post('/signin', checkout.signin)
routercheckout.post('/signup', checkout.signup)

export default routercheckout
