import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
import upload from "../middleware/multer.js";
import { createProduct, deleteProduct, filterByPrice, filters, getAllFeaturedProducts, getAllProducts, getAllProductsByRating, getAllProductsCount, getProduct, getProductsByCatId, getProductsByCatName, getProductsBySubCatId, getProductsBySubCatName, getProductsByThirdSubCatId, getProductsByThirdSubCatName, searchProductController, updateProduct} from "../controllers/product.controller.js";

const productRouter = Router();


// productRouter.post("/uploadImages",authMiddleware,upload.array('images'),uploadImages)
productRouter.post("/createProduct",authMiddleware,upload.array('images'),createProduct)
productRouter.get("/getAllProducts",getAllProducts)
productRouter.get('/getProductsByCatId/:id',getProductsByCatId)
productRouter.get('/getProductsByCatName',getProductsByCatName)
productRouter.get('/getProductsBySubCatId/:id',getProductsBySubCatId)
productRouter.get('/getProductsBySubCatName',getProductsBySubCatName)
productRouter.get('/getProductsByThirdSubCatId/:id',getProductsByThirdSubCatId)
productRouter.get('/getProductsByThirdSubCatName',getProductsByThirdSubCatName)
productRouter.get('/filterByPrice',filterByPrice)
productRouter.get('/getAllProductsByRating',getAllProductsByRating)
productRouter.get('/getAllProductsCount',getAllProductsCount)
productRouter.get('/getAllFeaturedProducts',getAllFeaturedProducts)
productRouter.delete('/:id',deleteProduct)
productRouter.get('/:id',getProduct)
productRouter.put('/updateProduct/:id',upload.array('images'),authMiddleware,updateProduct)
productRouter.post('/filters',filters);
productRouter.get('/search/get',searchProductController)
export default productRouter