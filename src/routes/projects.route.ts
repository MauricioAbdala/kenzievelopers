import { Router } from "express";
import { projectCreateController, readProjectByIdController, updateProjectController } from "../controllers/projects.controller";
import { verifyProjectId } from "../middlewares/verifyProjectId.middleware";
import { verifyDeveloperId } from "../middlewares/verifyDeveloperId.middleware";


export const projectsRoutes: Router = Router();


projectsRoutes.post('/', verifyDeveloperId, projectCreateController);

projectsRoutes.get('/:id', verifyProjectId, readProjectByIdController);
projectsRoutes.patch('/:id', verifyProjectId, verifyDeveloperId, updateProjectController);