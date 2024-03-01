import { QueryResult } from "pg";

export type Projects = {
  id: number,
  name: string,
  description: string,
  repository: string
  startDate: Date | string,
  endDate?: Date | string,
  developerId?: number,
};

export type ProjectsResult = QueryResult<Projects>;
export type ProjectCreate = Omit<Projects, "id">;
export type ProjectUpdate = Partial<Projects>;


