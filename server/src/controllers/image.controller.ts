import { Request, Response } from "express";

export const getAllImages = async (req: Request, res: Response): Promise<void> => {
    try{
        const page = req.query['page'] || 1;
        const limit = req.query['limit'] || 8;
        const skip = Number(limit)*(Number(page) - 1);
    }
    catch(error){
        
    }
}