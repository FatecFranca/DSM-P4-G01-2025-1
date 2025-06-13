import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  dado: {
    type: String,
    riquered: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
})

export default mongoose.model('Medidas', userSchema)
