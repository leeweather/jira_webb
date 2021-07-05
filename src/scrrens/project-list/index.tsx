import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import * as qs from "qs";
import { changeObject, useDebounce, useMount } from "utils";
import { useHttp } from "utils/http";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParams = useDebounce(param, 200);
  const client = useHttp();

  useEffect(() => {
    client("projects", { data: changeObject(debounceParams) }).then(setList);
  }, [debounceParams]);

  useMount(() => {
    client('users').then(setUsers)
  });

  return (
    <div>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <List users={users} list={list}></List>
    </div>
  );
};
