import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import userRouter from './routes/userRoutes.js';
import employeeRouter from './routes/employeeRoutes.js';
import path from 'path';
dotenv.config();

const app = express();
const port  = process.env.PORT || 3000 

app.use(cors())

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use("/api/auth",userRouter);
app.use("/api/employee",employeeRouter);


app.listen(port,()=>{
 console.log(`Server is running on https:localhost:${port}`)
})