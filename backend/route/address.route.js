import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
import { addAddress,getUserAddresses,deleteAddress,setDefaultAddress,updateAddress } from "../controllers/address.controller.js";
const addressRouter = Router()



addressRouter.post("/add", authMiddleware, addAddress);
addressRouter.get("/", authMiddleware, getUserAddresses);
addressRouter.put("/update/:id", authMiddleware, updateAddress);
addressRouter.delete("/delete/:id", authMiddleware, deleteAddress);
addressRouter.put("/default/:id", authMiddleware, setDefaultAddress);

export default addressRouter