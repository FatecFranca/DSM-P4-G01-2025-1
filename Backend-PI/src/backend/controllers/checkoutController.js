import pkg from 'jsonwebtoken'
import register from '../service/userRegister.js'
import login from '../service/userLogin.js'
import getUserData from '../utils/getUserData.js'
import dotenv from 'dotenv'

const { sign } = pkg
dotenv.config({ path: '.env' })

class checkoutController {
  async signin(req, res) {
    const user = await login(req)

    if (!user.email) {
      return res.status(401).send({ error: 'Invalid credentials' })
    }

    const tokenData = {
      name: user.name,
      email: user.email,
    }

    const tokenKey = process.env.KEY

    const tokenOptions = {
      subject: String(user._id),
      expiresIn: '1h',
    }

    const token = sign(tokenData, tokenKey, tokenOptions)

    const params = {
      email: user.email,
    }

    const data = await getUserData(token, params) // Makes a request on the user route, passing token and email as parameters to return all user data

    return res.status(200).send({ data, token })
  }
  async signup(req, res) {
    await register(req, res)
  }
}

export default checkoutController
