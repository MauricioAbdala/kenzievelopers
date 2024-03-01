import { NextFunction, Request, Response } from "express";
import { Developer, DeveloperResult } from "../interfaces/developers.interface";
import { client } from "../database/database";
import AppError from "../errors/App.error";

export const verifyDeveloperId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (req.baseUrl === "/projects" && !req.body.developerId) return next();

    const id: string | number = req.body.developerId || req.params.id;

    const queryResult: DeveloperResult = await client.query(
        'SELECT * FROM "developers" WHERE "id" = $1;',
        [id],
    );

    if (!queryResult.rowCount) {
        throw new AppError("Developer not found.", 404);
    };

    const foundDeveloper: Developer = queryResult.rows[0];

    res.locals = { ...res.locals, foundDeveloper };

    return next();
};