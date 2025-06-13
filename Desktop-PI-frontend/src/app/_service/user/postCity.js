import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const url = process.env.NEXT_PUBLIC_BACKEND_URL

export const addCity = async (_id, city, token) => {
  try {
    const response = await axios.post(
      `${url}/user/create/city?_id=${encodeURIComponent(_id)}&city=${encodeURIComponent(city)}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return { success: true, response }
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || 'Verifique os dados.',
    }
  }
}
