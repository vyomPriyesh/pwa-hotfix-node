import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";
const { Schema } = mongoose;

const PartySchema = new Schema(
    {
        name: { type: String },
        contact_person: { type: String },
        email: { type: String },
        mobile: { type: String },
        address: { type: String },
        gst: { type: String },
        pancard: { type: String },
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
