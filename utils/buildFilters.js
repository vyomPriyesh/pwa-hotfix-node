const buildFilters = async (params, searchFields) => {

    const {
        search,
    } = params;

    const query = { deleted_at: { $in: [null, undefined] } };

    if (search && searchFields && searchFields.length) {
        query.$or = searchFields.map((field) => ({
            [field]: { $regex: search, $options: "i" },
        }));
    }

    return query;

}

export default buildFilters;