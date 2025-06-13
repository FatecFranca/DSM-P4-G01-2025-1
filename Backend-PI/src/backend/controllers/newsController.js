import { scrapeClimatempoComPuppeteer } from '../service/webScraping/index.js'
import News from '../models/News.js'

class newsController {
  async getNews(req, res) {
    try {
      const news = await News.find()
      return res.status(200).json(news)
    } catch (error) {
      console.error('Erro ao obter notícias:', error)
      return res.status(500).json({ error: 'Erro ao obter notícias' })
    }
  }
  async updateNews(req, res) {
    try {
      await News.deleteMany({})
      const data = await scrapeClimatempoComPuppeteer()
      await News.insertMany(data)

      return res.status(200).send('News update sucess')
    } catch (error) {
      console.error('Erro ao atualizar as noticias:', error)
      return res.status(500).json({ error: 'Erro ao Atualizar as noticias' })
    }
  }
}

export default newsController
