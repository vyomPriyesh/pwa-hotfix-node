import User from "../models/User.js";
import { catchAsync } from "../utils/catchAsync.js";
import bcryptjs from 'bcryptjs'
import { sendResponse } from "../utils/response.js";
import { generateToken } from "../utils/jwt.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


class AuthController {

    static login = catchAsync(async (req, res) => {

        const { mobile, password } = req.body;

        const user = await User.findOne({ mobile });
        if (!user) {
            return sendResponse(res, 500, 'User Not Found', false)
        }

        const hash = user.password;
        if (!hash) {
            return sendResponse(res, 500, 'Password field is missing for this user type.', false)
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return sendResponse(res, 422, 'Invalid password', false)
        }
        const token = generateToken(user);
        const userData = await User.findByIdAndUpdate(
            { _id: user._id },
            {
                $push: {
                    login_devices: {
                        token,
                        login_time: new Date()
                    }
                }
            },
            { new: true },
        ).select("-login_devices -password");
        const data = {
            user: userData,
            token,
        }
        return sendResponse(res, 200, 'Login successful', true, data);
    })

    static register = catchAsync(async (req, res) => {

        const data = req.body
        const olduser = await User.findOne({ mobile: data?.mobile });
        if (olduser) {
            return sendResponse(res, 500, 'Mobile Number Already Registered', false)
        }
        data.password = await bcryptjs.hash(data.password, 10);

        const add = await User.create(data)
        return sendResponse(res, 200, 'get', true, add)

    })

    static profile = catchAsync(async (req, res) => {

        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded?.id).select("-login_devices -password")
        if (!user) {
            return sendResponse(res, 500, 'User Not Found', false)
        }
        return sendResponse(res, 200, 'Login successful', true, user)
    })
    static updateprofile = catchAsync(async (req, res) => {

        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const data = req.body
        delete data.password
        delete data.mobile
        const user = await User.findById(decoded?.id).select("-login_devices -password")
        if (!user) {
            return sendResponse(res, 500, 'User Not Found', false)
        }
        const update = await User.findByIdAndUpdate(decoded?.id, data, { new: true }).select("-login_devices -password")
        return sendResponse(res, 200, 'Login successful', true, update)
    })

    static changePassword = catchAsync(async (req, res) => {

        const { id } = req.params
        const { password } = req.body
        const newPass = await bcryptjs.hash(password, 10);

        const user = await User.findById(id);
        if (!user) {
            return sendResponse(res, 500, 'User Not Found', false)
        }
        const update = await User.findByIdAndUpdate(id, { password: newPass }, { new: true }).select("-password -login_devices")

        return sendResponse(res, 200, 'Login successful', true, update)

    })

}

export default AuthController;