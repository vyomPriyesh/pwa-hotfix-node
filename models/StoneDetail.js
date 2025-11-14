import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";
const { Schema } = mongoose;

const StoneDetailSchema = new Schema(
    {
        design_id: { type: Schema.Types.ObjectId, ref: "Design", },
        type: { type: String },
        size: { type: String },
        color: { type: String },
        price: { type: String },
    },
    {
        timestamps: true,
        changeStreamPreAndPostImages: true,
    }
)
StoneDetailSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });

const StoneDetail = mongoose.model("StoneDetail", StoneDetailSchema);

export default StoneDetail;
