import serializeruser from '../_serializer/serializeruser'

const authPage = async () => {
  const data = await JSON.parse(sessionStorage.getItem('user'))
  const customerSerialized = serializeruser(data)
  localStorage.setItem('customer', JSON.stringify(customerSerialized))

  return customerSerialized
}

export default authPage
