import { User } from "scrrens/project-list/search-panel";
import { useEffect } from "react";
import { changeObject } from "utils";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";

export const useUser = (param?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();

  const client = useHttp();

  useEffect(() => {
    run(client("users", { data: changeObject(param || {}) }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
