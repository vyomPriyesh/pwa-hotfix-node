import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";
const { Schema } = mongoose;

const DesignSchema = new Schema(
    {
        category: { type: Schema.Types.ObjectId, ref: "Category", },
        party: { type: Schema.Types.ObjectId, ref: "Party", },
        name: { type: String },
        design_no: { type: String },
        notes: { type: String },
        images: [{ type: String }],
        advance: { type: Boolean, default: false },
        status: { type: Boolean, default: true }
    },
    {
        timestamps: true,
        changeStreamPreAndPostImages: true,
    }
)
DesignSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });

const Design = mongoose.model("Design", DesignSchema);

export default Design;
