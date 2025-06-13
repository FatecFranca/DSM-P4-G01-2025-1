import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const url = process.env.NEXT_PUBLIC_BACKEND_URL

export const authLogin = async (email, password) => {
  try {
    const response = await axios.post(
      `${url}/login/signin`,
      {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
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
