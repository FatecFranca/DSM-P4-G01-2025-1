function userSerialaizer(user) {
  return {
    _id: user._id.toString(),
    email: user.email,
    user: user.user,
    city: user.city || null,
  }
}

export default userSerialaizer
