import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
import { addToCartItemController, deleteCartItemController, getCartItemController, updateCartItemController } from "../controllers/cartproduct.controller.js";
import categoryRouter from "./category.route.js";
const cartRouter = Router()

cartRouter.post("/add",authMiddleware,addToCartItemController)
cartRouter.get('/get',authMiddleware,getCartItemController)
cartRouter.put('/update-qty',authMiddleware,updateCartItemController)
cartRouter.delete("/delete-cart-item/:id",authMiddleware,deleteCartItemController)


export default cartRouter