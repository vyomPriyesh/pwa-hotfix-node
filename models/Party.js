import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";
const { Schema } = mongoose;

const PartySchema = new Schema(
    {
        name: { type: String },
        status: { type: Boolean, default: true }
    },
    {
        timestamps: true,
        changeStreamPreAndPostImages: true,
    }
)
PartySchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });

const Party = mongoose.model("Party", PartySchema);

export default Party;
