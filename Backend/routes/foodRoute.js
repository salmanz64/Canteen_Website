import express from 'express'

import multer from 'multer'
import { addFood, listFoods, removeFood } from '../controllers/foodController.js';


const foodRouter = express.Router();



//to store the images 
const storage = multer.diskStorage({
    // destination:"uploads",
    destination:(req,file,cb)=>{cb(null,'/temp');},

    //change the filename arrving to unqiue with datetime and originalname
    filename: (req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})


foodRouter.post('/add',upload.single("image"),addFood)
foodRouter.get('/lists',listFoods)
foodRouter.post('/remove',removeFood)

export default foodRouter;