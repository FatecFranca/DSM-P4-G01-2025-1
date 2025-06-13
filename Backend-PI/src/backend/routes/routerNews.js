import { Router } from 'express'
import newsController from '../controllers/newsController.js'

const routerNews = Router()

const news = new newsController()

routerNews.get('/news', news.getNews)
routerNews.get('/news/update', news.updateNews)

export default routerNews
