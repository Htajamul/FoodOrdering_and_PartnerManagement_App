import express from "express";
import { foodPartnerLogout,foodPartnerSignIn,foodPartnerSignUp,getFoodfPartner,getPartner } from "../controllers/foodpartnerController.js";
import {auth} from '../middlewares/auth.js'
const foodPartnerRouter = express.Router()


foodPartnerRouter.post('/signUp',foodPartnerSignUp)
foodPartnerRouter.post('/signIn',foodPartnerSignIn)
foodPartnerRouter.get('/logout',foodPartnerLogout)
foodPartnerRouter.get('/me',auth,getFoodfPartner)
foodPartnerRouter.get("/:foodPartnerId",getPartner)



export {foodPartnerRouter}