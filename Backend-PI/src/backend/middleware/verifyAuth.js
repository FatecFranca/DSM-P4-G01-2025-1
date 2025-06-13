import pkg from 'jsonwebtoken'
import dotenv from 'dotenv'

const { verify } = pkg
dotenv.config({ path: '.env' })

const key = process.env.KEY

function verifyAuth(req, res, next) {
  const authToken = req.headers.authorization

  if (authToken) {
    const [, token] = authToken.split(' ')

    try {
      verify(token, key) // If there is an authentication error, the code will go to the catch block.
      console.log('logged in user')
      return next()
    } catch (err) {
      return res.status(401).json({
        message: 'Unauthorized',
      })
    }
  }

  return res.status(401).json({
    message: 'Unauthorized',
  })
}

export default verifyAuth
