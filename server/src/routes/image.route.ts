import { Router } from "express";
import { getAllImages, generateImage } from "../controllers/image.controller";

export const imageRouter = Router();

imageRouter.get("/all", getAllImages);

imageRouter.post("/generate", generateImage);



