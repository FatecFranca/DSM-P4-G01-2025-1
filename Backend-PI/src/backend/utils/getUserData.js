import auth from '../service/axios.config.js'

async function getUserData(token, params) {
  return auth
    .get('/user', {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    .then((response) => response.data)
    .catch((error) => {
      console.error('Erro:', error)
      throw error
    })
}

export default getUserData
