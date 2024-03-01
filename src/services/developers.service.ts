import format from "pg-format";
import {
    DeveloperCreate,
    Developer,
    DeveloperResult,
    DeveloperUpdate,
} from "../interfaces/developers.interface";
import { client } from "../database/database";


export const createDeveloperService = async (data: DeveloperCreate): Promise<Developer> => {
    const queryFormat: string = format(
        `INSERT INTO "developers" (%I) VALUES (%L) RETURNING *;`,
        Object.keys(data),
        Object.values(data),
    );

    const queryResult: DeveloperResult = await client.query(queryFormat);

    return queryResult.rows[0];
};



export const readDeveloperByIdService = async (developerId: string): Promise<Developer> => {
    console.log("Valor de developerId:", developerId);

    const query: string = `
  SELECT
  "d"."id" AS "developerId",
  "d"."name" AS "developerName",
  "d"."email" AS "developerEmail",
  "di"."developerSince" AS "developerInfoDeveloperSince",
  "di"."preferredOS" AS "developerInfoPreferredOS"
  FROM "developers" AS "d"
  LEFT JOIN "developerInfos" AS "di"
  ON "di"."developerId" = "d"."id"
  WHERE "d"."id" = $1;
`;
    const queryResult: DeveloperResult = await client.query(query, [developerId]);

    console.log("Resultado da consulta:", queryResult.rows[0]);
    return queryResult.rows[0];
};

export const updateDeveloperService = async (developerId: string, data: DeveloperUpdate): Promise<Developer> => {
    const queryFormat: string = format(`
      UPDATE "developers" SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING *;`,
        Object.keys(data),
        Object.values(data),
    );

    const queryResult: DeveloperResult = await client.query(queryFormat, [developerId]);

    return queryResult.rows[0];
}

export const deleteDeveloperService = async (developerId: string): Promise<void> => {
    const query: string = `DELETE FROM "developers" WHERE "id" = $1;`;

    await client.query(query, [developerId]);
};

