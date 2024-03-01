import { client } from "../database/database";
import { ProjectCreate, ProjectUpdate, Projects, ProjectsResult } from "../interfaces/projects.interface";
import format from "pg-format";

export const createProjectService = async (data: ProjectCreate): Promise<Projects> => {
    const queryFormat: string = format(
        `INSERT INTO "projects" (%I) VALUES (%L) RETURNING *;`,
        Object.keys(data),
        Object.values(data),
    );

    const queryResult: ProjectsResult = await client.query(queryFormat);

    return queryResult.rows[0];
};

export const readProjectByIdService = async (projectId: string): Promise<Projects> => {
    console.log("Valor de projectIddeveloperId:", projectId);

    const query: string = `
  SELECT
  "p"."id" AS "projectId",
  "p"."name" AS "projectName",
  "p"."description" AS "projectDescription",
  "p"."repository" AS "projectRepository",
  "p"."startDate" AS "projectStartDate",
  "p"."endDate" AS "projectEndDate",
  "d"."name" AS "projectDeveloperName"
  FROM "projects" AS "p"
  LEFT JOIN "developers" AS "d"
  ON "p"."developerId" = "d"."id"
  WHERE "p"."id" = $1;
`;
    const queryResult: ProjectsResult = await client.query(query, [projectId]);

    console.log("Resultado da consulta:", queryResult.rows[0]);
    return queryResult.rows[0];
};

export const updateProjectService = async (projectId: string, data: ProjectUpdate): Promise<Projects> => {
    const queryFormat: string = format(`
      UPDATE "projects" SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING *;`,
        Object.keys(data),
        Object.values(data),
    );

    const queryResult: ProjectsResult = await client.query(queryFormat, [projectId]);

    return queryResult.rows[0];
};