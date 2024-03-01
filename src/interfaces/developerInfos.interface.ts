import { QueryResult } from "pg";


export type DeveloperInfos = {
    id: number,
    developersSince: Date | string,
    preferredOS: "windows" | "linux" | "macOS",
    developerId: number,
};

export type DeveloperInfoResult = QueryResult<DeveloperInfos>;
export type DeveloperInfoCreate = Omit<DeveloperInfos, "id">;








