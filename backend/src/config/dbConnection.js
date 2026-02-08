
import mongoose from "mongoose";

const connect_Db = async ()=>{
    try {
        const connectionInstance  = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`);
        console.log("mongodb is connected....")
    } catch (error) {
        console.log("mongodb connection failed",error);
        process.exit(1)
    }
}

export default connect_Db;
