
import mongoose from "mongoose";

const foodPartnerSchema = new mongoose.Schema(
    {
        name:{
            type : String,
            required : true
        },

        email :{
            type : String,
            required : true,
            unique : true

        },

        role : {
            type : String,
            required : true
        },

        password :{
            type : String,
            required : true
        }
    },{timestamps:true})

const foodPartner = mongoose.model("FoodPartner",foodPartnerSchema);
export {foodPartner}   