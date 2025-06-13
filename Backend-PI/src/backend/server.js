import routercheckout from './routes/routercheckout.js'
import routerUser from './routes/routerUser.js'
import routerHg from './routes/routerHgApi.js'
import routerNews from './routes/routerNews.js'
import routerTemp from './routes/routerTemp.js'
import conectDataBase from './service/conectionDataBase.js'
import configServer from './service/server.config.js'
import { app } from './service/server.config.js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

//database
conectDataBase()

//routes
app.use('/login', routercheckout)
app.use('/', routerUser)
app.use('/api', routerHg)
app.use('/api', routerNews)
app.use('/api', routerTemp)

//config server.js
configServer()

export default app
