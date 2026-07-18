import {
  type Request,
  type Response,
  type NextFunction,
  type Router
} from 'express'
import express from 'express'


const roomRouter: Router = express.Router({
  caseSensitive: true,
  strict: true
})

roomRouter.get('/', (req, res) => {
  res.send('rooms')
})

export default roomRouter
