import { Request, Response } from "express";
import { createImage, fetchAllImages } from "../services/image.service";
import ResponseHandler from "../utils/responseHandler.util";
import { CreateImageRequestSizeEnum } from "openai";
import { cloudinary, gpt } from "../config/config";


export const getAllImages = async (req: Request, res: Response): Promise<void> => {
    try{
        const page = req.query['page'] || 1;
        const limit = req.query['limit'] || 8;
        const skip = Number(limit)*(Number(page) - 1);

        const images = await fetchAllImages(+limit, skip);

        ResponseHandler.success(res, images);
    }
    catch(error){
        ResponseHandler.ServerError(res, error);
    }
};

export const generateImage = async (req: Request, res: Response): Promise<void> => {
    const { prompt, size } = req.body;

    if (!prompt || prompt === ""){
        ResponseHandler.BadRequest(res, "", "Prompt is Required!");
        return;
    }

    let imageSize;

    switch(size){
        case "Small":
          imageSize = CreateImageRequestSizeEnum._256x256;
          break;
        case "Medium":
          imageSize = CreateImageRequestSizeEnum._512x512;
          break;
        case "Large":
          imageSize = CreateImageRequestSizeEnum._1024x1024;
          break;
        default:
          imageSize = CreateImageRequestSizeEnum._256x256;
          break;
    }

    try{
        const response = await gpt.createImage({
            prompt,
            n: 1,
            size: imageSize,
          });

        const image = response.data.data[0].url;

        if(!image){
            ResponseHandler.ServerError(res, "",  "Something went wrong while generating image");
            return ;
        }

        // uploading the image to cloudinary
        const uploadImage = await cloudinary.uploader.upload(image || "");

        const imageUrl = uploadImage.url.replace(/^http:/, "https:");

        await createImage({
            imageUrl,
            prompt
        });

        ResponseHandler.created(res, {imageUrl});
        return ;
    }
    catch(error: unknown){
        const castedError = error as Error;
        ResponseHandler.ServerError(res, castedError)
    }
}