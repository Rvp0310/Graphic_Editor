import mongoose, {Schema, models} from "mongoose";

const designSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: { type: String, required: true },
    type: {
        type: String,
        enum: ["whiteboard", "presentation"],
        required: true
    },
    content: { type: Schema.Types.Mixed, required: true },
    thumbnail: String
},
{
    timestamps: true
});

export const Design = models.Design || mongoose.model("Design", designSchema);