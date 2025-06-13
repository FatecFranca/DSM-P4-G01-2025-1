const serializedApi = (object) => {
  const description = object.cityWeather.results.description
  const city = object.cityWeather.results.city
  const rain = object.cityWeather.results.rain
  const data = object.cityWeather.results.forecast
  const temp = object.cityWeather.results.temp
  const humidity = object.cityWeather.results.humidity

  const serialized = {
    desc: description,
    city,
    rain,
    temp,
    humidity,
    forecast: [...data],
  }

  return serialized
}

export default serializedApi
