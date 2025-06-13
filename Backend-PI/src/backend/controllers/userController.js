import getUser from '../service/getUser.js'
import User from '../models/User.js'

class UserController {
  async getUser(req, res) {
    try {
      const { email } = req.query

      if (!email) {
        return res.status(401).json({
          message: 'email field required',
        })
      }

      const user = await getUser(email)

      if (!user) {
        return res.status(401).json({
          message: 'user not found',
        })
      }

      return res.status(201).json({ user })
    } catch (err) {
      console.error('Erro no signin:', err)
      if (!res.headersSent) {
        return res.status(500).json({ error: 'Internal server error' })
      }
    }
  }
  async postCity(req, res) {
    try {
      const { city, _id } = req.query

      if (!city) {
        return res.status(401).json({
          message: 'city field required',
        })
      }

      if (!_id) {
        return res.status(401).json({
          message: 'id field required',
        })
      }

      const user = await User.findByIdAndUpdate(_id, { city })

      if (!user) {
        return res.status(401).json({
          message: 'user not found',
        })
      }

      return res.status(200).json({
        message: 'success in update the user',
      })
    } catch (err) {
      console.error('Erro saved city:', err)
      if (!res.headersSent) {
        return res.status(500).json({ error: 'check the request data' })
      }
    }
  }
}

export default UserController
