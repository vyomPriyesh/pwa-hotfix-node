import User from "../models/User.js";
import { catchAsync } from "../utils/catchAsync.js";
import paginate from "../utils/pagination.js";
import { sendResponse } from "../utils/response.js";

class AdminController {

    static allUsers = catchAsync(async (req, res) => {
        const { page, limit } = req.body || {}
        const allUsers = await paginate(User, null, page, limit)
        return sendResponse(res, 200, 'All Users Found', true, allUsers);

    })
}

export default AdminController;