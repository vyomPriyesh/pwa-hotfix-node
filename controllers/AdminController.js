import User from "../models/User.js";
import buildFilters from "../utils/buildFilters.js";
import { catchAsync } from "../utils/catchAsync.js";
import paginate from "../utils/pagination.js";
import { sendResponse } from "../utils/response.js";

class AdminController {

    static allUsers = catchAsync(async (req, res) => {

        const { page, limit, ...allFilters } = req.body || {}

        const searchKeys = ['name', 'email', 'mobile']

        const query = await buildFilters(allFilters, searchKeys)

        const allUsers = await paginate(User, query, page, limit)

        return sendResponse(res, 200, 'All Users Found', true, allUsers);

    })
}

export default AdminController;