import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";
const { Schema } = mongoose;

const CategorySchema = new Schema(
    {
        name: { type: String },
        status: { type: Boolean, default: true }
    },
    {
        timestamps: true,
        changeStreamPreAndPostImages: true,
    }
)
CategorySchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });

const Category = mongoose.model("Category", CategorySchema);

export default Category;
