import Category from "../models/Category.js";
import Challan from "../models/Challan.js";
import Party from "../models/Party.js";
import buildFilters from "../utils/buildFilters.js";
import { catchAsync } from "../utils/catchAsync.js";
import generateUniqueNumber from "../utils/generateUniqueNumber.js";
import paginate from "../utils/pagination.js";
import { populateData } from "../utils/populateData.js";
import { sendResponse } from "../utils/response.js";

class ChallanController {

    static add = catchAsync(async (req, res) => {

        const data = req.body || {}

        let added
        if (data?.type == 'in') {
            data.job_number = await generateUniqueNumber(data?.type?.toUpperCase(), Challan, 'job_number');
            // const oldData = await Challan.findOne({ job_number: data?.job_number })
            // if (oldData) {
            //     return sendResponse(res, 422, 'Challan Already Exist', false)
            // }
            delete data?.design_number
            delete data?.finished
            delete data?.plain
            delete data?.rejected
            delete data?.in_id
            added = await Challan.create(data)
        } else {
            const inData = await Challan.findById(data?.in_id)
            if (!inData) {
                return sendResponse(res, 422, 'Challan Not Found', false)
            }
            if (inData?.pending == 0) {
                return sendResponse(res, 422, 'All Challan has been Created for This Job', false)
            }
            await Challan.findByIdAndUpdate(data?.in_id, { pending: data?.pending })
            const out_job_number = 'OUT' + inData?.job_number?.split("IN")[1]
            const addData = {
                type: data?.type,
                job_number: out_job_number,
                in_id: data?.in_id,
                design_number: data?.design_number,
                finished: data?.finished,
                plain: data?.plain,
                rejected: data?.rejected,
            }
            added = await Challan.create(addData)
        }
        return sendResponse(res, 200, 'Added', true, added)
    })

    static all = catchAsync(async (req, res) => {

        const { page, limit, ...allFilters } = req.body || {}

        const searchKeys = ['job_number', 'design_number', 'challan_no', 'type']

        const query = await buildFilters(allFilters, searchKeys)
        let newQuery
        const categories = await Category.find({
            status: true,
            $or: [
                { name: { $regex: allFilters?.search ?? '', $options: 'i' } },
            ]
        });
        const parties = await Party.find({
            status: true,
            $or: [
                { name: { $regex: allFilters?.search ?? '', $options: 'i' } },
            ]
        });
        const categoriesID = categories.map(list => list._id)
        const partiesID = parties.map(list => list._id)
        if (allFilters?.search && categoriesID?.length > 0) {
            newQuery = {
                ...query,
                $or: [
                    ...query.$or,
                    { category: { $in: categoriesID } }
                ]
            }

        } else if (allFilters?.search && partiesID?.length > 0) {
            newQuery = {
                ...query,
                $or: [
                    ...query.$or,
                    { party: { $in: partiesID } }
                ]
            }
        } else {
            newQuery = query
        }

        const allChallan = await paginate(Challan, newQuery, page, limit)

        await populateData(allChallan?.data, Challan, [
            { path: "category", select: "name" },
            { path: "party", select: "name" },
            { path: "carrier_person", select: "name mobile" },
            {
                path: "in_id", populate: [
                    { path: "category", select: "name" },
                    { path: "party", select: "name" },
                    { path: "carrier_person", select: "name mobile" },
                ]
            },
        ])
        return sendResponse(res, 200, 'All Category', true, allChallan);

    })

    static delete = catchAsync(async (req, res) => {

        const { id } = req.params
        const inData = await Challan.findById(id)
        if (!inData) {
            return sendResponse(res, 422, 'Challan Not Found', false)
        }
        await Challan.delete({ _id: id })
        await Challan.delete({ in_id: id })
        return sendResponse(res, 200, 'Deleted', true)
    })

    static allIn = catchAsync(async (req, res) => {

        const allINData = await Challan.find({ type: 'in', pending: { $gt: 0 } })
        return sendResponse(res, 200, 'Found', true, allINData)

    })

    static getJobNumber = catchAsync(async (req, res) => {
        return sendResponse(res, 200, 'Job Number', true, await generateUniqueNumber('IN', Challan, 'job_number'))
    })

    static single = catchAsync(async (req, res) => {

        const { id } = req.params

        const inData = await Challan.findById(id)
        if (!inData) {
            return sendResponse(res, 422, 'Challan Not Found', false)
        }
        return sendResponse(res, 200, 'Found', true, inData)

    })

}

export default ChallanController;