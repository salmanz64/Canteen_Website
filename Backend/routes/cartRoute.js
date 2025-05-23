import express from 'express'
import { addToCart,removeFromCart,getFromCart } from '../controllers/cartController.js'
import authMiddleWare from '../middlewares/auth.js'


const cartRouter = express.Router()


cartRouter.post('/add',authMiddleWare,addToCart)
cartRouter.post('/remove',authMiddleWare,removeFromCart)
cartRouter.post('/get',authMiddleWare,getFromCart)


export default cartRouter