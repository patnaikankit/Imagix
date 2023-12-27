import { Schema, model } from "mongoose"


interface ImageModel {
    prompt: string,
    imageUrl: string
}

const imageSchema = new Schema<ImageModel>(
    {
        prompt: {
            type: String,
            require: true
        },
        imageUrl: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true
    }
);

const imageModel = model<ImageModel>("Images", imageSchema);

export default imageModel;