import express from 'express'
import compression from 'compression'
import helmet from 'helmet'

import { type Express } from 'express'

import roomRouter from './Rooms/index.ts'


const app: Express = express()
app.use(compression())
app.use(helmet())
app.disable('x-powered-by')


app.use('/api/rooms', roomRouter)
const port = 3000

app.listen(port, () => {
  console.log(`App is listening on port:${port}`)
})

export { app }