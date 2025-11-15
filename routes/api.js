import express from "express";
import AuthController from "../controllers/AuthController.js";
import verifyToken from "../middleware/Auth.js";
import AdminController from "../controllers/AdminController.js";
import AdminAuth from "../middleware/AdminAuth.js";
import DropDownController from "../controllers/DropDownController.js";
import CategoryController from "../controllers/CategoryController.js";
import PartyController from "../controllers/PartyController.js";
import uploadFileMiddleware from "../middleware/upload.js";
import { folderName } from "../Config.js";
import multer from "multer";
import { catchAsync } from "../utils/catchAsync.js";
import { sendResponse } from "../utils/response.js";
import WorkTypeController from "../controllers/WorkTypeController.js";
import DesignController from "../controllers/DesignController.js";
import ChallanController from "../controllers/ChallanController.js";
import mongoose from "mongoose";

const api = express.Router();

const upload = multer();

api.get('/', catchAsync(async (req, res) => {
    const connectionState = mongoose.connection.readyState;
    // 1 means connected
    if (connectionState === 1) {
        return sendResponse(res, 200, 'Files uploaded successfully!', true, { state: 'connected' });
    } else {
        return sendResponse(res, 500, 'Database not connected', false, { state: 'disconnected' });
    }
}));

api.post('/images/upload', catchAsync(async (req, res) => {
    await uploadFileMiddleware(req, res);   

    if (req?.files?.length === 0) {
        return sendResponse(res, 400, 'Please upload at least one file!', false);
    }
    const filenames = req.files?.map(file => file.filename);
    const formattedImages = filenames?.map(filename => `/${folderName}/${filename}`);
    return sendResponse(res, 200, 'Files uploaded successfully!', true, formattedImages);
}));

// -----------------Auth------------------------
api.post("/login", AuthController.login)
api.post("/register", AdminAuth, AuthController.register)
api.get("/profile", verifyToken, AuthController.profile)
api.post("/update-profile/:id", verifyToken, AuthController.updateprofile)
api.post("/changePassword/:id", AdminAuth, AuthController.changePassword)

// -----------------Drop Down------------------------
api.get("/all-drop-down", DropDownController.allInOne)

// -----------------Category------------------------
api.post("/ctg/all", AdminAuth, CategoryController.allCtg)
api.post("/ctg/add", AdminAuth, CategoryController.add)
api.post("/ctg/update/:id", AdminAuth, CategoryController.update)
api.delete("/ctg/delete/:id", AdminAuth, CategoryController.delete)
api.get("/ctg/update-status/:id", AdminAuth, CategoryController.statusUpdate)

// -----------------Party------------------------
api.post("/party/all", AdminAuth, PartyController.allParty)
api.post("/party/add", AdminAuth, PartyController.add)
api.post("/party/update/:id", AdminAuth, PartyController.update)
api.delete("/party/delete/:id", AdminAuth, PartyController.delete)
api.get("/party/update-status/:id", AdminAuth, PartyController.statusUpdate)

// -----------------Party------------------------
api.post("/worktype/all", AdminAuth, WorkTypeController.allworktype)
api.post("/worktype/add", AdminAuth, WorkTypeController.add)
api.post("/worktype/update/:id", AdminAuth, WorkTypeController.update)
api.delete("/worktype/delete/:id", AdminAuth, WorkTypeController.delete)
api.get("/worktype/update-status/:id", AdminAuth, WorkTypeController.statusUpdate)

// -----------------Admin Users------------------------
api.post("/all-users", AdminAuth, AdminController.allUsers)
api.delete("/all-users/delete/:id", AdminAuth, AdminController.delete)

// ----------------Design-------------------------------
api.post("/design/add", AdminAuth, DesignController.add)
api.post("/design/all", AdminAuth, DesignController.allData)
api.post("/design/update/:id", AdminAuth, DesignController.update)
api.delete("/design/delete/:id", AdminAuth, DesignController.delete)

// -------------Challan---------------------------
api.post("/challan/add", AdminAuth, ChallanController.add)
api.post("/challan/all", AdminAuth, ChallanController.all)
api.get("/challan/allIN", AdminAuth, ChallanController.allIn)
api.get("/challan/job-number", AdminAuth, ChallanController.getJobNumber)
api.delete("/challan/delete/:id", AdminAuth, ChallanController.delete)
api.get("/challan/single/:id", AdminAuth, ChallanController.single)



export default api;

