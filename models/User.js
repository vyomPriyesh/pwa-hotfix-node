import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        work_type: { type: Schema.Types.ObjectId, ref: "Worktype", },
        name: { type: String },
        email: { type: String },
        mobile: { type: String, unique: true },
        other_mobile: { type: String },
        password: { type: String },
        role: { type: String },
        date_of_birth: { type: Date },
        work_from: { type: String },
        work_to: { type: String },
        profile_image: { type: String },
        design_image: { type: Boolean },
        challan_image: { type: Boolean },
        login_devices: [
            {
                token: String,
                ip: String,
                user_agent: String,
                device_name: String,
                login_time: Date
            }
        ],
    },
    {
        timestamps: true,
        changeStreamPreAndPostImages: true,
    }
)
UserSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });

const User = mongoose.model("User", UserSchema);

export default User;
