import User from '../models/User.js'
import userSerialaizer from '../serialaizer/userSerialaizer.js'

export default async function getUser(email) {
  const user = await User.findOne({ email })

  const data = userSerialaizer(user)

  return data
}
