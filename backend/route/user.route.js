import { Router } from "express";
import { authWithGoogle, forgetPasswordController, loginUserController, logoutController, registerUserController, removeImageFromCloudinary, resetPassword, userAvatarController, userDetails, verifyEmailController, verifyForgotPasswordController } from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.js";
import upload from "../middleware/multer.js";

let userRouter = Router();

userRouter.post("/register",registerUserController)
userRouter.post('/login',loginUserController)
userRouter.post('/verify-email', verifyEmailController)
userRouter.get('/logout',logoutController)
userRouter.put('/user-avatar',authMiddleware,upload.array('avatar'),userAvatarController)
userRouter.delete('/deleteImage',authMiddleware,removeImageFromCloudinary)
userRouter.post('/forgetpassword',forgetPasswordController)
userRouter.post('/verify-forget-password-otp',verifyForgotPasswordController);
userRouter.post("/reset-password",resetPassword)
userRouter.get('/user-details',authMiddleware,userDetails)
userRouter.post('/googleAuth',authWithGoogle)
export default userRouter