import bcrypt from 'bcrypt'
import User from '../models/User.js'

async function register(req, res) {
  try {
    const { user, email, password, confirmedPassword } = req.body

    //verification
    if (
      !email?.trim() ||
      !password?.trim() ||
      !user?.trim() ||
      !confirmedPassword?.trim()
    ) {
      return res.status(500).json({
        message: 'fill in all fields',
      })
    }

    if (password !== confirmedPassword) {
      return res.status(500).json({
        message: 'the passwords do not match',
      })
    }

    const checkEmail = await User.findOne({ email })

    if (checkEmail) {
      return res.status(500).json({
        message: 'error email already used',
      })
    }

    // generate hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
      email,
      password: hashedPassword,
      user,
    })

    return res.status(200).json({
      message: 'user created successfully',
    })
  } catch (err) {
    console.log(err)

    return res.status(500).json({
      error: 'Error creating user',
    })
  }
}

export default register
