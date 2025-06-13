import { Router } from 'express'
import tempController from '../controllers/tempController.js'

const routerTemp = Router()

const temp = new tempController()

routerTemp.get('/temp', temp.getTemp)

export default routerTemp
