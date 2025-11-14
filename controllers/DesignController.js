import Category from "../models/Category.js";
import Design from "../models/Design.js";
import Labour from "../models/Labour.js";
import Material from "../models/Material.js";
import PaperDetails from "../models/PaperDetails.js";
import Party from "../models/Party.js";
import StoneDetail from "../models/StoneDetail.js";
import buildFilters from "../utils/buildFilters.js";
import { catchAsync } from "../utils/catchAsync.js";
import paginate from "../utils/pagination.js";
import { populateData } from "../utils/populateData.js";
import { sendResponse } from "../utils/response.js";

class DesignController {

    static add = catchAsync(async (req, res) => {

        const data = req.body || {}

        const design = await Design.create(data)
        let labourData = []
        for (const list of data?.labour) {
            list.design_id = design?._id
            labourData.push(await Labour.create(list))
        }
        let paper_details = []
        let stone_detail = []
        let material = []
        if (data?.advance) {
            for (const list of data?.paper_details) {
                list.design_id = design?._id
                paper_details.push(await PaperDetails.create(list))
            }
            for (const list of data?.stone_detail) {
                list.design_id = design?._id
                stone_detail.push(await StoneDetail.create(list))
            }
        } else {
            for (const list of data?.material) {
                list.design_id = design?._id
                material.push(await Material.create(list))
            }

        }
        const result = {
            ...design?.toObject(),
            labour: labourData,
            material,
            paper_details,
            stone_detail,
        }

        return sendResponse(res, 200, 'Added', true, result)

    })

    static update = catchAsync(async (req, res) => {

        const data = req.body || {}
        const { id } = req.params

        const design = await Design.findById(id)
        if (!design) {
            return sendResponse(res, 422, 'Design Not Found', false)
        }
        const updatedDesign = await Design.findByIdAndUpdate(id, data, { new: true }).lean()
        let labourData = []
        for (const list of data?.labour) {
            labourData.push(await Labour.findByIdAndUpdate(list?._id, list, { new: true }))
        }
        let paper_details = []
        let stone_detail = []
        let material = []
        if (data?.advance) {
            for (const list of data?.paper_details) {
                paper_details.push(await PaperDetails.findByIdAndUpdate(list?._id, list, { new: true }))
            }
            for (const list of data?.stone_detail) {
                stone_detail.push(await StoneDetail.findByIdAndUpdate(list?._id, list, { new: true }))
            }
        } else {
            for (const list of data?.material) {
                material.push(await Material.findByIdAndUpdate(list?._id, list, { new: true }))
            }
        }

        const result = {
            ...updatedDesign,
            labour: labourData,
            material,
            paper_details,
            stone_detail,
        }

        return sendResponse(res, 200, 'Added', true, result)

    })

    static delete = catchAsync(async (req, res) => {

        const { id } = req.params
        const design = await Design.findById(id)
        if (!design) {
            return sendResponse(res, 422, 'Design Not Found', false)
        }
        await Design.delete({ _id: id })
        await Labour.delete({ design_id: { $in: id } })
        if (design?.advance) {
            await PaperDetails.delete({ design_id: { $in: id } })
            await StoneDetail.delete({ design_id: { $in: id } })
        } else {
            await Material.delete({ design_id: { $in: id } })
        }
        return sendResponse(res, 200, 'Deleted', true)
    })

    static allData = catchAsync(async (req, res) => {

        const { page, limit, ...allFilters } = req.body || {}

        const searchKeys = ['name', 'design_no']

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

        const allCtg = await paginate(Design, newQuery, page, limit)
        await populateData(allCtg?.data, Design, [
            { path: "category", select: "name" },
            { path: "party", select: "name" },
        ])

        for (const list of allCtg?.data) {
            list.labour = await Labour.find({ design_id: { $in: list?._id } })
            list.material = await Material.find({ design_id: { $in: list?._id } })
            list.paper_details = await PaperDetails.find({ design_id: { $in: list?._id } })
            list.stone_detail = await StoneDetail.find({ design_id: { $in: list?._id } })
        }


        return sendResponse(res, 200, 'All Category', true, allCtg);

    })

}

export default DesignController;