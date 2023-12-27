import { Document } from "mongoose"

export type imageInput = {
    prompt: string,
    imageUrl: string
}

export interface imageOuput extends Document{
    prompt: string,
    imageUrl: string,
    createdAt: Date;
    updatedAt: Date;
}