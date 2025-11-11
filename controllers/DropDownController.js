import Category from "../models/Category.js";
import Party from "../models/Party.js";
import User from "../models/User.js";
import Worktype from "../models/Worktype.js";
import { catchAsync } from "../utils/catchAsync.js";
import { sendResponse } from "../utils/response.js";

const getValusName = (data, name, value, subkey) => {
    return data.map(list => ({
        name: list[name],
        label: list[name],
        value: list[value],
        sub_data: list[subkey],
    })) || []
}
class DropDownController {

    static allInOne = catchAsync(async (req, res) => {

        const allUsers = await User.find().sort({ createdAt: -1 })
        const allCtg = await Category.find().sort({ createdAt: -1 })
        const allParty = await Party.find().sort({ createdAt: -1 })
        const allWorktype = await Worktype.find().sort({ createdAt: -1 })
        const result = {
            users: getValusName(allUsers, 'name', '_id'),
            categories: getValusName(allCtg, 'name', '_id'),
            parties: getValusName(allParty, 'name', '_id'),
            worktypes: getValusName(allWorktype, 'name', '_id'),
        }
        return sendResponse(res, 200, 'All DropDown', true, result);

    })

}

export default DropDownController;