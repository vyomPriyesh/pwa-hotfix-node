import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";
const { Schema } = mongoose;

const LabourSchema = new Schema(
    {
        design_id: { type: Schema.Types.ObjectId, ref: "Design", },
        name: { type: String },
        price: { type: String },
    },
    {
        timestamps: true,
        changeStreamPreAndPostImages: true,
    }
)
LabourSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });

const Labour = mongoose.model("Labour", LabourSchema);

export default Labour;
