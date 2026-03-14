import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
import { createOrder, getOrders } from "../controllers/orders.controller.js";

const orderRouter = Router();

orderRouter.post("/createOrder",authMiddleware,createOrder)
orderRouter.get("/",authMiddleware,getOrders)

export default orderRouter