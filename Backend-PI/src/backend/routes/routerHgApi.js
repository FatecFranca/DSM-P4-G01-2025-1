import { Router } from 'express'
import hgController from '../controllers/hgController.js'

const routerHg = Router()

const hg = new hgController()

routerHg.get('/hg', hg.getWeather)

export default routerHg
