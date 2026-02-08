import { foodPartner } from "../models/foodpartnerModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// 
const foodPartnerSignUp = async (req, res) => {
    try {
        const { name, email, password,role } = req.body
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "each field is required" });
        }

        const user = await foodPartner.findOne({ email })
        if (user) {
            return res.status(409).json({ message: "partner already exist" })
        }

        const hashpassword = await bcrypt.hash(password, 10)
        const createdUser = await foodPartner.create({
            name,
            email,
            role,
            password: hashpassword
        })

        if (!createdUser) {
            return res.status(500).json({ message: "internal server error" })
        }
        res.status(200).json({ message: "partner created successfully", createdUser })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            messsage: "internal server errorr"
        })
    }
}


const foodPartnerSignIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "all fields are required" })
        }

        const user = await foodPartner.findOne({ email });
        // console.log(user)
        if (!user) {
            return res.status(404).json({ message: "partner does not found plz register yourself" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" })
        }
        const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
        // console.log(token)

        const userData = user.toObject();
        delete userData.password;
        delete userData.updatedAt;
        delete userData.createdAt;
        // console.log(userData)

        res.cookie("token", token)
        res.status(200).json({ message: "signin successfully",token, userData })
    } catch (error) {
        res.status(500).json({
            messsage: "internal server errorr"
        })

    }
}


const foodPartnerLogout = (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "foodPartner logout successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            messsage: "internal server errorr"
        })
    }
}


const getFoodfPartner = async (req, res) => {
    try {
        const userId = req.userId;

        // console.log(userId,"hi")
        const user = await foodPartner.findById(userId).select("name email role")
        // console.log(user,"user")
        if (!user) {
            return res.status(500).json({ message: "user not found" })
        }
        res.status(200).json({ user, message: "user found successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            messsage: "internal server errorr"
        })
    }



}
// not userd yet
const getPartner = async (req, res) => {
    try {
        const { foodPartnerId } = req.params
        const user = await foodPartner.findById(foodPartnerId).select("name email role")
        if (!user) {
            return res.status(500).json({ message: "user not found" })
        }
        res.status(200).json({ user, message: "user found successfully" })
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            messsage: "internal server errorr"
        })
    }

}

export { foodPartnerSignUp, foodPartnerSignIn, foodPartnerLogout, getFoodfPartner, getPartner }