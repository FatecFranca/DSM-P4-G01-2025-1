import mongoose from 'mongoose'

const newsSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    imagem: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export default mongoose.model('News', newsSchema)
