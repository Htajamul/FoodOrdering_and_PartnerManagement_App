
import jwt from "jsonwebtoken";


const auth = async (req, res, next) => {
    const token = req.cookies.token;
//    console.log(token)
    if (!token) {
        return res.status(401).json({ message: "plz login first" })
    }

    try {
        const payload = await jwt.verify(token, process.env.SECRET_KEY)
        req.userId = payload.id
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            messsage: "Unaoutherized"
        })
    }

}

export { auth }