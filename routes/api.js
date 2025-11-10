import express from "express";
import AuthController from "../controllers/AuthController.js";
import verifyToken from "../middleware/Auth.js";
import AdminController from "../controllers/AdminController.js";
import AdminAuth from "../middleware/AdminAuth.js";
import DropDownController from "../controllers/DropDownController.js";
import CategoryController from "../controllers/CategoryController.js";
import PartyController from "../controllers/PartyController.js";

const api = express.Router();

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
api.delete("/ctg/update/:id", AdminAuth, CategoryController.delete)
api.get("/ctg/update-status/:id", AdminAuth, CategoryController.statusUpdate)

// -----------------Party------------------------
api.post("/party/all", AdminAuth, PartyController.allParty)
api.post("/party/add", AdminAuth, PartyController.add)
api.post("/party/update/:id", AdminAuth, PartyController.update)
api.delete("/party/update/:id", AdminAuth, PartyController.delete)
api.get("/party/update-status/:id", AdminAuth, PartyController.statusUpdate)

// -----------------Admin Users------------------------
api.post("/all-users", AdminAuth, AdminController.allUsers)


export default api;

