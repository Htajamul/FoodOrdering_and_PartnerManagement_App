import express from "express";
import { signIn, signUp,logOut,getUser } from "../controllers/usercontroller.js";

const userRout = express.Router()

userRout.post('/signUp',signUp)
userRout.post('/signIn',signIn)
userRout.get('/:userId',getUser)
userRout.get('/logout',logOut)

export {userRout}