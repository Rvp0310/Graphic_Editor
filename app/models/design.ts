import mongoose, {Schema} from "mongoose";

const design = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: String,
    canvas: Schema.Types.Mixed,
    thumbnail: String
},
{
    timestamps: true
});