import axios from 'axios'
;('configurar variavel de ambiente')

const url = process.env.NEXT_PUBLIC_BACKEND_URL

export const authregister = async (
  user,
  email,
  password,
  confirmedPassword,
) => {
  try {
    const response = await axios.post(
      `${url}/login/signup`,
      {
        user,
        email,
        password,
        confirmedPassword,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    return { success: true }
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || 'Erro desconhecido ao cadastrar.',
    }
  }
}
