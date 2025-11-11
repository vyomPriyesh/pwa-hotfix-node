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

const api = express.Router();

const upload = multer();

api.post('/images/upload', catchAsync(async (req, res) => {
    await uploadFileMiddleware(req, res);
    console.log(req.body)
    if (req?.files?.length === 0) {
        return sendResponse(res, 400, 'Please upload at least one file!', false);
    }
    const filenames = req.files.map(file => file.filename);
    const formattedImages = filenames.map(filename => `/${folderName}/${filename}`);
    return sendResponse(res, 200, 'Files uploaded successfully!', true, formattedImages);
}));

// -----------------Auth------------------------
api.post("/login", AuthController.login)
api.post("/register", AdminAuth, AuthController.register)
api.get("/profile", verifyToken, AuthController.profile)
api.post("/update-profile", verifyToken, AuthController.updateprofile)
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


export default api;

