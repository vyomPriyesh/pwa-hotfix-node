import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";
const { Schema } = mongoose;

const MaterialSchema = new Schema(
    {
        design_id: { type: Schema.Types.ObjectId, ref: "Design", },
        item: { type: String },
        qty: { type: String },
        price: { type: String }
    },
    {
        timestamps: true,
        changeStreamPreAndPostImages: true,
    }
)
MaterialSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });

const Material = mongoose.model("Material", MaterialSchema);

export default Material;
