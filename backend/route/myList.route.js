import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
import { addToMyListController, deleteMyListController, getMyListController } from "../controllers/mylist.controller.js";


const myListRouter = Router();

myListRouter.post("/addToMyList",authMiddleware,addToMyListController)
myListRouter.get("/getMyList",authMiddleware,getMyListController)
myListRouter.delete("/deleteMyList/:id",authMiddleware,deleteMyListController)


export default myListRouter