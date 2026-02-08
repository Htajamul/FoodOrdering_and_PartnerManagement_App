
import { Like } from "../models/likesModel.js";
import { Food } from "../models/foodmodel.js";
import { SaveModel } from "../models/saveModel.js";
import { uploadOnCloudniary } from "../utils/cloudnary.js";


const addFood = async (req, res) => {
    try {
        const { name, description } = req.body;
        const userId = req.userId;

        if ([name, description].some((field) => !field || field.trim() === "")) {
            return res.status(400).json({ message: "all feilds are required" })
        }
        if (!req.file) {
            return res.status(400).json({ message: "video file is required" })
        }

        const filePath = req.file.path;
        const videoUrl = await uploadOnCloudniary(filePath)
        if (!videoUrl) {
            return res.status(400).json({ message: "video file is required" })
        }

        const foodCreated = await Food.create(
            {
                name,
                description,
                video: videoUrl.url,
                foodpartner: userId
            }
        )
        if (!foodCreated) {
            return res.status(500).json({ message: "internal server error" })
        }
        res.status(201).json({ message: "food created successfully", foodCreated })
    } catch (error) {
        res.status(500).json({
            messsage: "internal server errorr"
        })
    }
}

const getFood = async (req, res) => {
    try {
        const foods = await Food.find().select("name video description likeCount foodpartner")

        if (!foods) {
            return res.status(500).json({ message: "no food items left" })
        }
        res.status(200).json({ foods, message: "food gotten successfully" })
    } catch (error) {
        res.status(500).json({
            messsage: "internal server errorr"
        })
    }

}

const likes = async (req, res) => {
    try {
        const { foodId } = req.params
        const userId = req.userId
        const isLiked = await Like.findOne({ food: foodId, user: userId });

        if (isLiked) {
            await Food.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } })
            await Like.deleteOne({ food: foodId, user: userId });
            return res.status(200).json({ message: "food unliked successfully" })
        }
        await Like.create({ user: userId, food: foodId })
        await Food.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } })
        res.status(201).json({ message: "food liked successfully" })
    } catch (error) {
        res.status(500).json({
            messsage: "internal server errorr"
        })
    }
}

const save = async (req, res) => {
    try {
        const { foodId } = req.params
        const userId = req.userId
        const isSaved = await SaveModel.findOne({ food: foodId, user: userId })
        if (isSaved) {
            await SaveModel.findByIdAndDelete(isSaved._id)
            return res.status(200).json({ message: "Unsaved successfully" })
        }
        await SaveModel.create({ food: foodId, user: userId })
        res.status(201).json({ message: "saved successfully" })
    } catch (error) {
        res.status(500).json({
            messsage: "internal server errorr"
        })
    }

}

const getSavedVideos = async (req, res) => {
    try {
        const userId = req.userId;
        const savedVideos = await SaveModel.find({ user: userId }).select("food -_id")
        if (savedVideos.length == 0) {
            return res.status(404).json({ message: "no saved videos" })
        }
        const foodIds = savedVideos.map((item) => item.food)
        const foods = await Food.find({ _id: { $in: foodIds } }).select('description name video')
        res.status(200).json({ message: "successfully", foods })
    } catch (error) {
        res.status(500).json({
            messsage: "internal server errorr"
        })
    }
}

const getFoodsOfParticularPartner = async (req, res) => {
    try {
        const { foodPartnerId } = req.params
        const foods = await Food.find({ foodpartner: foodPartnerId }).select("name video description foodpartner likeCount")
        if (!foods) {
            return res.status(500).json({ message: "no food items" })
        }
        res.status(200).json({ message: "successfully", foods })
    } catch (error) {
        res.status(500).json({
            messsage: "internal server errorr"
        })
    }

}

const getOneFood = async (req, res) => {
    try {
        const userId = req.userId
        const { foodId } = req.params
        const food = await Food.findOne({ foodpartner: userId, _id: foodId }).select('name description')
        if (!food) {
            return res.status(409).json({ message: "food not found" })
        }
        res.status(200).json({ message: "successfully", food })
    } catch (error) {
        res.status(500).json({
            messsage: "internal server errorr"
        })
    }
}

const updateFood = async (req, res) => {
    try {
        const { name, description } = req.body;
        const userId = req.userId
        const { foodId } = req.params
        const updatedfood = await Food.findByIdAndUpdate(
            { foodpartner: userId, _id: foodId },
            { name, description },
            { new: true }
        ).select("name description video")
        if (!updatedfood) {
            return res.status(409).json({ message: "food not found" })
        }
        res.status(200).json({ message: "successfully", updatedfood })
    } catch (error) {
        res.status(500).json({
            messsage: "internal server errorr"
        })
    }

}

const deletefood = async (req, res) => {
    try {
        const { foodId } = req.params;
        const userId = req.userId;
        const food = await Food.findOneAndDelete({ foodpartner: userId, _id: foodId })
        if(!food){
            return res.status(409).json({ message: "food not found" })
        }
        res.status(200).json({message:"successfully deleted"})
    } catch (error) {
        res.status(500).json({
            messsage: "internal server errorr"
        })
    }

}

export { addFood, getFood, likes, save, getSavedVideos, getFoodsOfParticularPartner, getOneFood, updateFood, deletefood }