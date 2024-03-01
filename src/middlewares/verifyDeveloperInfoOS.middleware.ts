import { NextFunction, Request, Response } from "express";
import AppError from "../errors/App.error";

export const verifyDeveloperInfoOS = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const allowedOS = new Set(["Windows", "MacOS", "Linux"]);
    const preferredOS: string = req.body.preferredOS;

    if (!preferredOS || !allowedOS.has(preferredOS)) {
        throw new AppError("Invalid OS option.", 400);
    };

    return next();
};