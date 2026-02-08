import { User } from "../models/usermodal.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
// here

const signUp = async (req, res) => {
    try {
        const { name, email, password,role } = req.body;
        
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "each feild is required" })
        }

        const existingUser = await User.findOne({ email })
       
        if (existingUser) {
            return res.status(409).json({ message: "user already exist" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            fullName:name,
            email,
            role,
            password: hashedPassword
        })

        if (!user) {
            return res.status(500).json({ message: "internal server eror" })
        }

        const userdata = user.toObject();
        delete userdata.password;

        res.status(201).json({
            messsage: "user created successfully",
            userdata
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "internal server errorr",
            error: error
        })
    }

}


const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Each feild is required" })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found plz signUp" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const token = await jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        )
        
        const userData = user.toObject();
        delete userData.password;
        delete userData.updatedAt;
        delete userData.createdAt;
        // delete userData._id;

        res.cookie("token", token);
        res.status(200).json({ userData, message: "signIn successfully" })
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        })
    }
}


const logOut = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: "User log out successfully" })
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        })
    }
}

const getUser = async(req,res)=>{
    try {
        const { userId } = req.params;
        console.log(userId,"user")
        const user = await User.findById(userId).select("name ")
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


export { signUp, signIn, logOut, getUser }