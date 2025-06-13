import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const auth = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
})

export default auth
