import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";
const { Schema } = mongoose;

const PaperDetailsSchema = new Schema(
    {
        design_id: { type: Schema.Types.ObjectId, ref: "Design", },
        design_no: { type: String },
        paper_role: { type: String },
        size: { type: String },
        dia_patti: { type: String },
        saree_patti: { type: String },
        net_paper: { type: String },
        images: [{ type: String }],
    },
    {
        timestamps: true,
        changeStreamPreAndPostImages: true,
    }
)
PaperDetailsSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });

const PaperDetails = mongoose.model("PaperDetails", PaperDetailsSchema);

export default PaperDetails;
