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
        query.mobile = { $ne: "9099257782" };

        const allUsers = await paginate(User, query, page, limit)

        return sendResponse(res, 200, 'All Users Found', true, allUsers);

    })
    static delete = catchAsync(async (req, res) => {

        const { id } = req.params
        const ctg = await User.findById(id)
        if (!ctg) {
            return sendResponse(res, 500, 'User Not Found', false)
        }
        await User.delete({ _id: id })
        return sendResponse(res, 200, 'Deleted', true);

    })

}

export default AdminController;