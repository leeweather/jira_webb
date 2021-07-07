import { useEffect } from "react";
import { changeObject } from "utils";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";
import { Project } from "scrrens/project-list/list";

export const useProjects = (params?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();

  const client = useHttp();

  useEffect(() => {
    run(client("projects", { data: changeObject(params || {}) }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return result;
};
