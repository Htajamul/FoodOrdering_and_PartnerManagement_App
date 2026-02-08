import dotenv from 'dotenv'
dotenv.config({
    path:'.env'
})

import { app } from "./src/app.js";
import connect_Db from "./src/config/dbConnection.js";



connect_Db()
.then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log("server is running on the port",process.env.PORT)
    })
})
.catch((err)=>{
    console.log("error in connecting db",err)
})