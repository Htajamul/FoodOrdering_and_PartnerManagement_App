import mongoose from "mongoose";


const foodSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },

        video : {
            type : String,
            required : true
        },

        description : {
            type : String,
        },

        foodpartner : {
            type : mongoose.Schema.Types.ObjectId,
            ref :"FoodPartner"
        },

        likeCount:{
            type:Number,
            default:0
        }

    },{timestamps:true})

const Food = mongoose.model('Food',foodSchema);
export {Food}
