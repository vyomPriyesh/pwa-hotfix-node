import Category from "../models/Category.js";
import buildFilters from "../utils/buildFilters.js";
import { catchAsync } from "../utils/catchAsync.js";
import paginate from "../utils/pagination.js";
import { sendResponse } from "../utils/response.js";

class CategoryController {

    static add = catchAsync(async (req, res) => {

        const data = req.body
        const added = await Category.create(data)
        return sendResponse(res, 200, 'Added', true, added);

    })

    static update = catchAsync(async (req, res) => {

        const { id } = req.params
        const data = req.body
        const ctg = await Category.findById(id)
        if (!ctg) {
            return sendResponse(res, 500, 'Category Not Found', false)
        }
        const updated = await Category.findByIdAndUpdate(id, data, { new: true })
        return sendResponse(res, 200, 'Updated', true, updated);

    })
    static delete = catchAsync(async (req, res) => {

        const { id } = req.params
        const ctg = await Category.findById(id)
        if (!ctg) {
            return sendResponse(res, 500, 'Category Not Found', false)
        }
        await Category.delete({ _id: id })
        return sendResponse(res, 200, 'Deleted', true);

    })
    static statusUpdate = catchAsync(async (req, res) => {

        const { id } = req.params
        const ctg = await Category.findById(id)
        if (!ctg) {
            return sendResponse(res, 500, 'Category Not Found', false)
        }
        const updated = await Category.findByIdAndUpdate(id, { status: !ctg?.status }, { new: true })
        return sendResponse(res, 200, 'Deleted', true, updated);

    })

    static allCtg = catchAsync(async (req, res) => {

        const { page, limit, ...allFilters } = req.body || {}

        const searchKeys = ['name']

        const query = await buildFilters(allFilters, searchKeys)

        const allCtg = await paginate(Category, query, page, limit)
        
        return sendResponse(res, 200, 'All Category', true, allCtg);

    })

}

export default CategoryController;