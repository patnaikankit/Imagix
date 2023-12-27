// the logic to retrieve all the genearted images and to store the a new generated image 
import imageModel from "../models/image.model" 
import { imageInput, imageOuput } from "../types/image";

// function to find all the images alongwith the parameters skip and limit to skip the entries you don't want and the no. of images you wish to be shown 
export const fetchAllImages = async (limit: number, skip: number): Promise<unknown[]> => {
    // the images are going to returned in descending order 
    return imageModel.find().skip(skip).limit(limit).sort({createdAt: -1}).exec();
}

// function to basically store the generated image in the databse
export const createImage = async (input: imageInput): Promise<imageOuput> => {
    const { imageUrl, prompt } = input;

    const newImage = new imageModel({
        imageUrl,
        prompt
    });

    return newImage.save() as Promise<imageOuput>
}