import express from 'express'
import authMiddleWare from '../middlewares/auth.js'
import  { listOrders, placeOrder,updateStatus,userOrders, verifyOrder } from '../controllers/orderController.js'

const orderRouter = express.Router()

orderRouter.post('/place',authMiddleWare,placeOrder)
orderRouter.post('/verify',authMiddleWare,verifyOrder)
orderRouter.post('/userOrders',authMiddleWare,userOrders)
orderRouter.get('/list',listOrders)
orderRouter.post('/status',updateStatus)

export default orderRouter
