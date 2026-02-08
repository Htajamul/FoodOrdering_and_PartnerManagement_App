import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { userRout } from './routes/userRoutes.js';
import { foodPartnerRouter } from './routes/foodPartnerRoutes.js';
import { foodRouter } from './routes/foodRoutes.js';

const app = express();

app.use(cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))



app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use('/partner',foodPartnerRouter);
app.use('/user',userRout);
app.use('/food',foodRouter)
export {app}