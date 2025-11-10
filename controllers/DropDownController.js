import Category from "../models/Category.js";
import Party from "../models/Party.js";
import User from "../models/User.js";
import { catchAsync } from "../utils/catchAsync.js";
import { sendResponse } from "../utils/response.js";

const getValusName = (data, name, value, subkey) => {
    return data.map(list => ({
        name: list[name],
        value: list[value],
        sub_data: list[subkey],
    })) || []
}
class DropDownController {

    static allInOne = catchAsync(async (req, res) => {

        const allUsers = await User.find()
        const allCtg = await Category.find()
        const allParty = await Party.find()
        const result = {
            users: getValusName(allUsers, 'name', '_id'),
            categories: getValusName(allCtg, 'name', '_id'),
            parties: getValusName(allParty, 'name', '_id'),
        }
        return sendResponse(res, 200, 'All DropDown', true, result);

    })

}

export default DropDownController;