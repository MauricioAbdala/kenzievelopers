import { NextFunction, Request, Response } from "express";
import { Projects, ProjectsResult } from "../interfaces/projects.interface";
import { client } from "../database/database";
import AppError from "../errors/App.error";

export const verifyProjectId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params

    const queryResult: ProjectsResult = await client.query(
        'SELECT * FROM "projects" WHERE "id" = $1;',
        [id],
    );

    if (!queryResult.rowCount) {
        throw new AppError("Developer not found.", 404);
    };

    const foundProject: Projects = queryResult.rows[0];

    res.locals = { ...res.locals, foundProject };

    return next();
};