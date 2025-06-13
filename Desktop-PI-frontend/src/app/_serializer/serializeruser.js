export default function serializeruser(obj) {
  if (!obj) {
    return null
  }

  const _id = obj.response.data.data.user._id
  const email = obj.response.data.data.user.email
  const user = obj.response.data.data.user.user
  const city = obj.response?.data?.data?.user?.city
  const token = obj.response?.data?.token

  return { _id, email, user, city, token }
}
