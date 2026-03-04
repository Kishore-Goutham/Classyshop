import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config();
import connectDB from './config/connectDB.js'
import userRouter from './route/user.route.js'
import categoryRouter from './route/category.route.js'
import productRouter from './route/product.route.js'
import cartRouter from './route/cartproduct.route.js'
import myListRouter from './route/myList.route.js'
import addressRouter from './route/address.route.js'

const PORT = process.env.PORT || 8000;


const app = express();
app.use(cors({
    origin: ["https://classyshop-seven.vercel.app/","http://localhost:3001"]
}));
app.use(express.json())
app.use(cookieParser());
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy : false
}))


app.get("/",(req,res)=>{
    res.send({message:"server is running "+PORT})
})

app.use('/api/user',userRouter)
app.use('/api/category',categoryRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/myList',myListRouter)
app.use('/api/address',addressRouter)

connectDB().then(()=>{
    app.listen(PORT,()=>{
    console.log("server started "+PORT)
})
})