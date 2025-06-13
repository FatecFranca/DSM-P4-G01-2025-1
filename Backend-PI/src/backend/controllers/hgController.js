import getCityWeather from '../utils/cityWeather.js'

class hgController {
  async getWeather(req, res) {
    const { city } = req.query

    if (!city) {
      return res.status(401).send({ error: 'fiel city required' })
    }
    const cityWeather = await getCityWeather(city)

    return res.status(200).send({ cityWeather: cityWeather })
  }
}

export default hgController
