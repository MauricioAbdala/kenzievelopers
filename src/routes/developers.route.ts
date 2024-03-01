import { Router } from "express";
import {
    createDeveloperController,
    createDeveloperInfosController,
    deleteDeveloperController,
    readDeveloperByIdController,
    updateDeveloperController,
} from "../controllers/developers.controller";
import { verifyEmail } from "../middlewares/verifyEmail.middleware";
import { verifyDeveloperId } from "../middlewares/verifyDeveloperId.middleware";
import { verifyDeveloperInfoOS } from "../middlewares/verifyDeveloperInfoOS.middleware";
import { verifyDeveloperIdInfos } from "../middlewares/verifyDeveloperIdInfos.middleware";


export const developersRoutes: Router = Router();

developersRoutes.post('/', verifyEmail, createDeveloperController);

developersRoutes.use('/:id', verifyDeveloperId);

developersRoutes.get('/:id', readDeveloperByIdController);
developersRoutes.patch('/:id', verifyEmail, updateDeveloperController);
developersRoutes.delete('/:id', deleteDeveloperController);
developersRoutes.post('/:id/infos', verifyDeveloperInfoOS, verifyDeveloperIdInfos, createDeveloperInfosController);