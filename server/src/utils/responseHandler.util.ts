// here we will be defining static methods to handle the various http response encountered throughtout the application
import { Response } from "express";

class ResponseHandler{
    // retreving all images
    static success = (res: Response, data: unknown, message=""): unknown => {
        return res.status(200).json({
            success: true,
            message,
            code: 200,
            data
        });
    };

    // if image is successfully created
    static created = (res: Response, data: unknown, message=""): unknown => {
        return res.status(201).json({
            success: true,
            message,
            code: 201,
            data
        });
    };

    // server issue
    static ServerError = (res: Response, data: unknown, message="Something went wrong..."): unknown => {
        return res.status(500).json({
            success: false,
            message,
            code: 500,
            data,
        });
    };

    // Bad request - wrong query params
    static BadRequest = (res: Response, data: unknown, message="Bad Request"): unknown => {
        return res.status(400).json({
            success: false,
            message,
            code: 400,
            data
        });
    };

    // endpoint does not exist
    static NotFound = (res: Response, message=""): unknown => {
        return res.status(404).json({
            success: false,
            message,
            code: 404
        });
    };

    // user is not permitted to request a protected route
    static NotAuthorized = (res: Response, message=""): unknown => {
        return res.status(401).json({
            success: true,
            message,
            code: 401
        });
    };
}


export default ResponseHandler;