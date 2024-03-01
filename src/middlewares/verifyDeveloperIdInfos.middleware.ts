import { NextFunction, Request, Response } from "express";
import { DeveloperInfoResult } from "../interfaces/developerInfos.interface";
import { client } from "../database/database";
import AppError from "../errors/App.error";

export const verifyDeveloperIdInfos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id: string = req.params.id;

    const query: DeveloperInfoResult = await client.query(
        'SELECT * FROM "developerInfos" WHERE "developerId" = $1;', [id],
    );

    if (query.rowCount) {
        throw new AppError("Developer infos already exists.", 409);
    };

    return next();
};