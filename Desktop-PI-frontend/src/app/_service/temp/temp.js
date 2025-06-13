import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const url = process.env.NEXT_PUBLIC_BACKEND_URL

export const getTemp = async () => {
  try {
    const response = await axios.get(`${url}/api/temp`)

    return { success: true, response }
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || 'Verifique os dados.',
    }
  }
}
