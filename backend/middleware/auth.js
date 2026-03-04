import jwt from 'jsonwebtoken'
import UserModel from '../Model/user.model.js';

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1]
        console.log("Authorization header:", req.headers.authorization);

        if (!token) {
            return res.status(401).json({ message:'Please login to generate token'});
        }

        const decoded = jwt.verify(
            token,
            process.env.SECRET_KEY_ACCESS_TOKEN
        );


        //checking if user exist
        const user = await UserModel.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.userId = decoded.id;

        next();

    } catch (error) {
         console.log("Middleware error:", error.message);
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

export default authMiddleware