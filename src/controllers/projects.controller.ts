import { Request, Response } from "express";
import { Projects } from "../interfaces/projects.interface";
import { createProjectService, readProjectByIdService, updateProjectService } from "../services/projects.service";

export const projectCreateController = async (req: Request, res: Response): Promise<Response> => {
    const projects: Projects = await createProjectService(req.body);

    return res.status(201).json(projects);
};

export const readProjectByIdController = async (req: Request, res: Response): Promise<Response> => {
    const projects: Projects = await readProjectByIdService(req.params.id);

    return res.status(200).json(projects);
};

export const updateProjectController = async (req: Request, res: Response): Promise<Response> => {
    const projects: Projects = await updateProjectService(req.params.id, req.body);

    return res.status(200).json(projects);
};