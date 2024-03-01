import format from "pg-format";
import { DeveloperInfoCreate, DeveloperInfoResult, DeveloperInfos } from "../interfaces/developerInfos.interface";
import { client } from "../database/database";

export const createDeveloperInfosService = async (data: DeveloperInfoCreate): Promise<DeveloperInfos> => {
    const queryFormat: string = format(
        `INSERT INTO "developerInfos" (%I) VALUES (%L) RETURNING *;`,
        Object.keys(data),
        Object.values(data),
    );

    const queryResult: DeveloperInfoResult = await client.query(queryFormat);

    return queryResult.rows[0];
};