

import express, { Router } from 'express';
import { addFood,getFood,likes,save,getSavedVideos,getFoodsOfParticularPartner,getOneFood,updateFood,deletefood} from '../controllers/foodController.js';
import { auth } from '../middlewares/auth.js';
import { upload } from '../middlewares/multer.js';
const foodRouter = express.Router();

//update routes
foodRouter.get('/update/:foodId',auth,getOneFood)
foodRouter.put('/update-food/:foodId',auth,updateFood)
// delete food
foodRouter.get('/delete/:foodId',auth,deletefood)

foodRouter.post('/add',auth,upload.single('video'),addFood)
foodRouter.post('/like/:foodId',auth,likes)
foodRouter.post('/save/:foodId',auth,save)
foodRouter.get('/getSavedVideos',auth,getSavedVideos)
foodRouter.get('/:foodPartnerId',getFoodsOfParticularPartner)
foodRouter.get('/',auth,getFood)

export {foodRouter}




// CHECK THIS SYNTEX ALSO ====
// foodRouter.post('/add',auth,upload.fields([
//     {
//         name :"video",maxCount:1
//     }
// ]),addFood)