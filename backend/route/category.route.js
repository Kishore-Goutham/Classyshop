import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
import multer from "multer";
import upload from "../middleware/multer.js";
import { createCategory, deleteCategory, getCategoriesCount, getCategory, getCatogories, getSubCategoriesCount, updateCategory } from "../controllers/category.controller.js";
import { deleteProduct } from "../controllers/product.controller.js";

const categoryRouter = Router();


categoryRouter.post("/createCategory",authMiddleware,upload.array('images'),createCategory)
categoryRouter.get("/",getCatogories)
categoryRouter.get("/get/count",authMiddleware,getCategoriesCount)
categoryRouter.get("/get/count/subCat",authMiddleware,getSubCategoriesCount)
categoryRouter.get('/:id',authMiddleware,getCategory)
categoryRouter.delete('/:id',authMiddleware,deleteCategory)
categoryRouter.put('/:id',authMiddleware,upload.array('images'),updateCategory)
// categoryRouter.delete('/deleteProduct/:id',deleteProduct)

export default categoryRouter