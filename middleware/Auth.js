import User from "../models/User.js";
import { sendResponse } from "../utils/response.js";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];

        if (!token) {
            return sendResponse(res, 401, 'Access denied', false);
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const user = await User.findById(decoded?.id).select("-login_devices -password")
            if (!user) {
                return sendResponse(res, 500, 'Session expired', false)
            }
            req.user = user;
            next();
        } catch (error) {
            return sendResponse(res, 401, 'Invalid token', false);
        }
    } else {
        return sendResponse(res, 401, 'Invalid token', false);
    }
}
export default verifyToken;
