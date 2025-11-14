import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";
const { Schema } = mongoose;

const ChallanSchema = new Schema(
    {
        category: { type: Schema.Types.ObjectId, ref: "Category", },
        party: { type: Schema.Types.ObjectId, ref: "Party", },
        carrier_person: { type: Schema.Types.ObjectId, ref: "User", },
        in_id: { type: Schema.Types.ObjectId, ref: "Challan", },
        type: { type: String },
        challan_image: { type: String },
        mall_image: { type: String },
        job_number: { type: String },
        design_number: { type: String },
        challan_no: { type: String },
        mall_type: { type: String },
        finished: { type: String },
        plain: { type: String },
        rejected: { type: String },
        total_mall: { type: String },
        total_mall_amount: { type: String },
        pending: { type: String },
        notes: { type: String },
    },
    {
        timestamps: true,
        changeStreamPreAndPostImages: true,
    }
)
ChallanSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });

const Challan = mongoose.model("Challan", ChallanSchema);

export default Challan;
