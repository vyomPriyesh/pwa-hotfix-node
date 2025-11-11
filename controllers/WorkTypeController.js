import Worktype from "../models/Worktype.js";
import buildFilters from "../utils/buildFilters.js";
import { catchAsync } from "../utils/catchAsync.js";
import paginate from "../utils/pagination.js";
import { sendResponse } from "../utils/response.js";

class WorkTypeController {

    static add = catchAsync(async (req, res) => {

        const data = req.body
        const added = await Worktype.create(data)
        return sendResponse(res, 200, 'Added', true, added);

    })

    static update = catchAsync(async (req, res) => {

        const { id } = req.params
        const data = req.body
        const worktype = await Worktype.findById(id)
        if (!worktype) {
            return sendResponse(res, 500, 'Work Type Not Found', false)
        }
        const updated = await Worktype.findByIdAndUpdate(id, data, { new: true })
        return sendResponse(res, 200, 'Updated', true, updated);

    })
    static delete = catchAsync(async (req, res) => {

        const { id } = req.params
        const worktype = await Worktype.findById(id)
        if (!worktype) {
            return sendResponse(res, 500, 'Work Type Not Found', false)
        }
        await Worktype.delete({ _id: id })
        return sendResponse(res, 200, 'Deleted', true);

    })
    static statusUpdate = catchAsync(async (req, res) => {

        const { id } = req.params
        const worktype = await Worktype.findById(id)
        if (!worktype) {
            return sendResponse(res, 500, 'Work Type Not Found', false)
        }
        const updated = await Worktype.findByIdAndUpdate(id, { status: !worktype?.status }, { new: true })
        return sendResponse(res, 200, 'Deleted', true, updated);

    })

    static allworktype = catchAsync(async (req, res) => {

        const { page, limit, ...allFilters } = req.body || {}

        const searchKeys = ['name']

        const query = await buildFilters(allFilters, searchKeys)

        const allWorktype = await paginate(Worktype, query, page, limit)

        return sendResponse(res, 200, 'All Work Type', true, allWorktype);

    })

}

export default WorkTypeController;