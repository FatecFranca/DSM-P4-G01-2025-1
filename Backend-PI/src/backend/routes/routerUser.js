import { Router } from 'express'
import UserController from '../controllers/userController.js'
import verifyAuth from '../middleware/verifyAuth.js'

const routerUser = Router()

const user = new UserController()

routerUser.get('/user', verifyAuth, user.getUser)
routerUser.post('/user/create/city', verifyAuth, user.postCity)

export default routerUser
