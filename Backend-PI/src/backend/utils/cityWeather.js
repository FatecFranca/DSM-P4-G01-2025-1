import axios from 'axios'

const getCityWeather = async (city) => {
  try {
    const response = await axios.get(
      `https://api.hgbrasil.com/weather?key=${encodeURIComponent('SUA-CHAVE')}&city_name=${encodeURIComponent(city)}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    return response.data
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || 'Verifique os dados.',
    }
  }
}

export default getCityWeather
