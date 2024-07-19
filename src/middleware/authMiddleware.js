import jwt from "jsonwebtoken";
import asycnHandler from "express-async-handler";
import User from "../models/userModel.js";


const protect = asycnHandler(async (req, res, next) => {
    let token;


    token = req.cookies.jwt;

    if (token) {
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decode.userId).select("-password");

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Token Invalido!");
        }
    } else {
        res.status(401);
        throw new Error("No Autorizado!, No Hay Token")
    }


});


export { protect };