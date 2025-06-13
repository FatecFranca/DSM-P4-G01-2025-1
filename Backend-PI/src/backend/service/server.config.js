import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

export const app = express()

app.use(cors())
app.use(express.json())

dotenv.config({ path: '../.env' })

const PORT = 9000 || process.env.PORT

const configServer = () => {
  app.listen(PORT, () => {
    console.log(`Run: ${PORT}`)
  })
}

export default configServer
