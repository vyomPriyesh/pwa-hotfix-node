import Party from "../models/Party.js";
import { catchAsync } from "../utils/catchAsync.js";
import paginate from "../utils/pagination.js";
import { sendResponse } from "../utils/response.js";

class PartyController {

     static add = catchAsync(async (req, res) => {

        const data = req.body
        const added = await Party.create(data)
        return sendResponse(res, 200, 'Added', true, added);

    })

    static update = catchAsync(async (req, res) => {

        const { id } = req.params
        const data = req.body
        const party = await Party.findById(id)
        if (!party) {
            return sendResponse(res, 500, 'Party Not Found', false)
        }
        const updated = await Party.findByIdAndUpdate(id, data, { new: true })
        return sendResponse(res, 200, 'Updated', true, updated);

    })
    static delete = catchAsync(async (req, res) => {

        const { id } = req.params
        const party = await Party.findById(id)
        if (!party) {
            return sendResponse(res, 500, 'Party Not Found', false)
        }
        await Party.delete({ _id: id })
        return sendResponse(res, 200, 'Deleted', true);

    })
    static statusUpdate = catchAsync(async (req, res) => {

        const { id } = req.params
        const party = await Party.findById(id)
        if (!party) {
            return sendResponse(res, 500, 'Party Not Found', false)
        }
        const updated = await Party.findByIdAndUpdate(id, { status: !party?.status }, { new: true })
        return sendResponse(res, 200, 'Deleted', true, updated);

    })

    static allParty = catchAsync(async (req, res) => {

        const { page, limit } = req.body || {}
        const allParty = await paginate(Party, null, page, limit)
        return sendResponse(res, 200, 'All Party', true, allParty);

    })

}

export default PartyController;