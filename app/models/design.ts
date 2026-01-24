import mongoose, {Schema, models} from "mongoose";

const designSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: { type: String, required: true },
    canvas: { type: Schema.Types.Mixed, required: true },
    thumbnail: String
},
{
    timestamps: true
});

export const Design = models.designSchema || mongoose.model("Design", designSchema);