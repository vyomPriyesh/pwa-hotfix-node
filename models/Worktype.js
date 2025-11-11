import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";
const { Schema } = mongoose;

const WorktypeSchema = new Schema(
    {
        name: { type: String },
        status: { type: Boolean, default: true }
    },
    {
        timestamps: true,
        changeStreamPreAndPostImages: true,
    }
)
WorktypeSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });

const Worktype = mongoose.model("Worktype", WorktypeSchema);

export default Worktype;
