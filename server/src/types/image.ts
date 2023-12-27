import { Document } from "mongoose"

// properties for the input prompt
export type imageInput = {
    prompt: string,
    imageUrl: string
}

// properties for the generated image 
export interface imageOuput extends Document{
    prompt: string,
    imageUrl: string,
    createdAt: Date;
    updatedAt: Date;
}